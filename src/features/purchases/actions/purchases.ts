'use server';

import { db } from '@/drizzle/db';
import { revokeUserCourseAccess } from '@/features/courses/db/userCourseAccess';
import { getCurrentUser } from '@/services/clerk';
import { stripeServerClient } from '@/services/stripe/stripeServer';
import { updatePurchase } from '../db/purchases';
import { canRefundPurchases } from '../permissions/purchases';

export async function refundPurchase(id: string) {
  if (!canRefundPurchases(await getCurrentUser())) {
    return { error: true, message: 'There was an error refunding this purchase' };
  }

  const data = await db.transaction(async trx => {
    const refundedPurchase = await updatePurchase(id, { refundedAt: new Date() }, trx);

    const session = await stripeServerClient.checkout.sessions.retrieve(refundedPurchase.stripeSessionId);

    if (session.payment_intent == null) {
      trx.rollback();
      return {
        error: true,
        message: 'There was an error refunding this purchase',
      };
    }

    try {
      await stripeServerClient.refunds.create({
        payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id,
      });
      await revokeUserCourseAccess(refundedPurchase, trx);
    } catch {
      trx.rollback();
      return {
        error: true,
        message: 'There was an error refunding this purchase',
      };
    }
  });

  return data ?? { error: false, message: 'Successfully refunded purchase' };
}
