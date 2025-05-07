import { db } from '../db';
import { seedCourses } from './seedCourses';
import { seedCourseSections } from './seedCourseSections';
import { seedLessons } from './seedLessons';
import { seedProducts } from './seedProducts';

export async function seedDatabase() {
  await db.transaction(async trx => {
    const courses = await seedCourses(trx);

    if (courses == null) {
      trx.rollback();
      throw new Error('Could not seed courses');
    }

    const products = await seedProducts(courses, trx);

    if (products[0] == null) {
      trx.rollback();
      throw new Error('Could not seed products');
    }

    const sectionMap = await seedCourseSections(courses.map(c => c.courseId), trx);

    if (sectionMap == null) {
      trx.rollback();
      throw new Error('Could not seed course sections');
    }

    const lessons = await seedLessons(sectionMap, trx);

    if (lessons == null) {
      trx.rollback();
      throw new Error('Could not seed lessons');
    }
  });
}
