import { getCourseGlobalTag } from '@/features/courses/db/cache/courses';
import { getProductGlobalTag } from '@/features/products/db/cache';
import { revalidateTag } from 'next/cache';
import { db } from '../db';
import { CourseProductTable, ProductTable } from '../schema';
import { mockProducts } from './mockData';

export async function seedProducts(
  courses: { courseId: string; courseName: string }[],
  trx: Omit<typeof db, '$client'>
) {
  const productsToInsert: typeof ProductTable.$inferInsert[] = mockProducts.map(p => ({
    ...p,
    status: 'public',
  }));
  const courseProductsToInsert: typeof CourseProductTable.$inferInsert[] = [];

  const courseMap = Object.fromEntries(courses.map(c => [c.courseName, c.courseId]));

  const newProducts = await trx.insert(ProductTable).values(productsToInsert).returning({
    productId: ProductTable.id,
    name: ProductTable.name,
  });

  newProducts.forEach(product => {
    if (product.name === 'Bundle') {
      ['React Native for Beginners', 'Learn Next.js 14'].forEach(courseName => {
        const courseId = courseMap[courseName];
        if (courseId) {
          courseProductsToInsert.push({ productId: product.productId, courseId });
        }
      });
    } else {
      const courseId = courseMap[product.name];
      if (courseId) {
        courseProductsToInsert.push({ productId: product.productId, courseId });
      }
    }
  });

  // Insert relations
  await trx.insert(CourseProductTable).values(courseProductsToInsert);

  revalidateTag(getProductGlobalTag());
  revalidateTag(getCourseGlobalTag());

  return newProducts;
}
