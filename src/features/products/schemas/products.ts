import { productStatuses } from '@/drizzle/schema';
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().nonempty('Required'),
  priceInDollars: z.number().int().nonnegative(),
  description: z.string().nonempty('Required'),
  imageUrl: z.union([z.string().url('Invalid url'), z.string().startsWith('/', 'Invalid url')]),
  status: z.enum(productStatuses),
  courseIds: z.array(z.string()).nonempty('At least one course is required'),
});
