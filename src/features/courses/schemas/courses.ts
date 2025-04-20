import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().nonempty('Required'),
  description: z.string().nonempty('Required'),
});
