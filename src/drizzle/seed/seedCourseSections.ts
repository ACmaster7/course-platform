import { getCourseSectionGlobalTag } from '@/features/courseSections/db/cache';
import { revalidateTag } from 'next/cache';
import { db } from '../db';
import { CourseSectionTable } from '../schema';
import { mockCourseSections } from './mockData';

export async function seedCourseSections(courseIds: string[], trx: Omit<typeof db, '$client'>) {
  const dataToInsert: (typeof CourseSectionTable.$inferInsert)[] = [];

  courseIds.forEach(courseId => {
    mockCourseSections.forEach((sectionName, sectionIndex) => {
      dataToInsert.push({
        name: sectionName,
        courseId,
        order: sectionIndex,
        status: 'public',
      });
    });
  });

  const insertedData = await trx.insert(CourseSectionTable).values(dataToInsert).returning({
    sectionId: CourseSectionTable.id,
    courseId: CourseSectionTable.courseId,
  });

  if (insertedData == null || !insertedData[0]) return null;

  const sectionMap: Record<string, string[]> = {};

  for (const { courseId, sectionId } of insertedData) {
    if (!sectionMap[courseId]) {
      sectionMap[courseId] = [];
    }
    sectionMap[courseId].push(sectionId);
  }

  revalidateTag(getCourseSectionGlobalTag());

  return sectionMap;
}
