import { getLessonGlobalTag } from '@/features/lessons/db/cache/lessons';
import { revalidateTag } from 'next/cache';
import { db } from '../db';
import { LessonTable } from '../schema';
import { mockLessonsByCourse } from './mockData';

export async function seedLessons(sectionMap: Record<string, string[]>, trx: Omit<typeof db, '$client'>) {
  const allLessonsToInsert: (typeof LessonTable.$inferInsert)[] = [];

  Object.entries(sectionMap).forEach(([_, sectionIds], courseIndex) => {
    const courseLessons = mockLessonsByCourse[courseIndex];
    if (!courseLessons) {
      throw new Error(`No mock lessons found for course index ${courseIndex}`);
    }

    let lessonIndex = 0;

    sectionIds.forEach((sectionId, sectionIndex) => {
      const isFirstSection = sectionIndex === 0;
      const isLastSection = sectionIndex === sectionIds.length - 1;

      const lessonsForThisSection = isLastSection
        ? courseLessons.slice(lessonIndex)
        : courseLessons.slice(lessonIndex, lessonIndex + 2);

      lessonIndex += lessonsForThisSection.length;

      let localOrder = 0;
      lessonsForThisSection.forEach((lesson, lessonIdx) => {
        const isPreview = isFirstSection && lessonIdx < 2;

        allLessonsToInsert.push({
          ...lesson,
          order: localOrder++,
          sectionId,
          status: isPreview ? 'preview' : 'public',
        });
      });
    });
  });

  if (allLessonsToInsert.length === 0) {
    throw new Error('No lessons to insert!');
  }

  const newLessons = await trx.insert(LessonTable).values(allLessonsToInsert).returning();

  if (!newLessons || !newLessons[0]) {
    return null;
  }

  revalidateTag(getLessonGlobalTag());

  return newLessons;
}
