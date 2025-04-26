import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().nonempty(),
    DB_USER: z.string().nonempty(),
    DB_NAME: z.string().nonempty(),
    DB_HOST: z.string().nonempty(),
    CLERK_SECRET_KEY: z.string().nonempty(),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().nonempty(),
    ARCJET_KEY: z.string().nonempty(),
    TEST_IP_ADDRESS: z.string().nonempty().optional(),
    STRIPE_PPP_50_COUPON_ID: z.string().nonempty(),
    STRIPE_PPP_40_COUPON_ID: z.string().nonempty(),
    STRIPE_PPP_30_COUPON_ID: z.string().nonempty(),
    STRIPE_PPP_20_COUPON_ID: z.string().nonempty(),
  },
  experimental__runtimeEnv: process.env,
});
