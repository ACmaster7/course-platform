import { deleteUser, insertUser, updateUser } from '@/features/users/db/users';
import { syncClerkUserMetadata } from '@/services/clerk';
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log('✅✅✅✅ Received Clerk event:', evt.type);

    return TTT(evt);
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

async function TTT(event: WebhookEvent) {
  const eventType = event.type;

  switch (eventType) {
    case 'user.created':
    case 'user.updated': {
      const email = event.data.email_addresses.find(email => email.id === event.data.primary_email_address_id)
        ?.email_address;
      const name = `${event.data.first_name} ${event.data.last_name}`.trim();
      if (email == null) return new Response('No email', { status: 400 });
      if (name == '') return new Response('No name', { status: 400 });

      if (eventType === 'user.created') {
        const user = await insertUser({
          clerkUserId: event.data.id,
          email,
          name,
          imageUrl: event.data.image_url,
          role: 'user',
        });

        await syncClerkUserMetadata(user);
      } else {
        await updateUser({ clerkUserId: event.data.id }, {
          email,
          name,
          imageUrl: event.data.image_url,
          role: event.data.public_metadata.role,
        });
      }
      break;
    }
    case 'user.deleted':
      if (event.data.id) {
        await deleteUser({ clerkUserId: event.data.id });
      }
      break;
  }
  return new Response('', { status: 200 });
}
