import { getCourseGlobalTag } from '@/features/courses/db/cache/courses';
import { revalidateTag } from 'next/cache';
import { db } from '../db';
import { CourseTable } from '../schema';
import { mockCourses } from './mockData';

export async function seedCourses(trx: Omit<typeof db, '$client'>) {
  const data = await trx.insert(CourseTable).values(mockCourses).returning({
    courseId: CourseTable.id,
    courseName: CourseTable.name,
  });

  if (data[0] == null) return null;

  revalidateTag(getCourseGlobalTag());

  return data;
}
