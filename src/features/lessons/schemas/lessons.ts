import { lessonStatusEnum } from '@/drizzle/schema';
import { z } from 'zod';

export const lessonSchema = z.object({
  name: z.string().nonempty('Required'),
  sectionId: z.string().nonempty('Required'),
  status: z.enum(lessonStatusEnum.enumValues),
  youtubeVideoId: z.string().nonempty('Required'),
  description: z.string().transform(v => v === '' ? null : v).nullable(),
});
