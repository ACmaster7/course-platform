import { courseSectionStatuses } from '@/drizzle/schema';
import { z } from 'zod';

export const sectionSchema = z.object({
  name: z.string().nonempty('Required'),
  status: z.enum(courseSectionStatuses),
});
