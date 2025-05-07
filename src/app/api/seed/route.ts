import { seedDatabase } from '@/drizzle/seed/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await seedDatabase();

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);

    return NextResponse.json({
      message: 'Error seeding database',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
