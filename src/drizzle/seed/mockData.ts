import { CourseTable, LessonTable, ProductTable } from '../schema';

export const mockCourses: Pick<typeof CourseTable.$inferInsert, 'name' | 'description'>[] = [
  {
    name: 'React Native for Beginners',
    description:
      'Each video will help you learn React Native step-by-step. And if you want to keep learning after you finish this beginner series, I recommend Zero To Mastery\'s Complete React Native Developer Bootcamp (https://links.zerotomastery.io/CompleteReactNative) where you\'ll expand your skills while building and deploying large scale apps.',
  },
  {
    name: 'Learn Next.js 14',
    description:
      'Welcome to a new series on mastering Next.js, the React framework that\'s transforming web development! Are you ready to take your React skills to the next level and build fully-featured, production-ready applications? Look no further! In this series, we\'ll explore how Next.js elevates your web projects with its powerful features and streamlined development process.',
  },
  {
    name: 'Beginner Guitar Course',
    description:
      'Hey, welcome to the JustinGuitar Beginner Guitar Course! - the BEST one ever made. :) Are you ready for some fun? 🎸 In Grade 1, you’ll learn all the basics to start playing your guitar right away! Think of it as the quickstart to your guitar journey. 🚀 The Beginner Guitar Course has three grades, and Grade 1 is the first beginner guitar players should follow. 👉 For additional resources and to optimize your learning, check out the FREE full course on the website at https://www.justinguitar.com/classes/beginner-guitar-course-grade-one. Glad to be part of your new guitar journey! Now, grab your guitar and start learning. :)',
  }
];

export const mockProducts: readonly Pick<
  typeof ProductTable.$inferInsert,
  'name' | 'priceInDollars' | 'imageUrl' | 'description'
>[] = [
  {
    name: 'Bundle',
    description: 'You couldn\'t get a better offer',
    imageUrl: '/imgs/products/bundle.png',
    priceInDollars: 105,
  },
  {
    name: 'React Native for Beginners',
    description: 'This is a great course for learning React Native',
    imageUrl: '/imgs/products/react-native.png',
    priceInDollars: 60,
  },
  {
    name: 'Learn Next.js 14',
    description: 'This is a great course for learning Next.js 14',
    imageUrl: '/imgs/products/nextjs14.png',
    priceInDollars: 90,
  },
  {
    name: 'Beginner Guitar Course',
    description: 'This is a great course for learning guitar',
    imageUrl: '/imgs/products/beginner-guitar.png',
    priceInDollars: 70,
  }
];

export const mockCourseSections = ['Section 1', 'Section 2', 'Section 3'];

const mockLessonsCourse1: Pick<typeof LessonTable.$inferInsert, 'name' | 'youtubeVideoId' | 'order'>[] = [
  {
    name: 'React Native for Beginners tutorial',
    youtubeVideoId: 'Hp9sTsiTZ_I',
    order: 0,
  },
  {
    name: 'Create an App with React Native',
    youtubeVideoId: '1ETOJloLK3Y',
    order: 1,
  },
  {
    name: 'React Native Navigation with Expo Router',
    youtubeVideoId: 'czhLCGuu_AU',
    order: 2,
  },
  {
    name: 'React Native List Views for Beginners',
    youtubeVideoId: 'dUVuIJx-RYw',
    order: 3,
  },
  {
    name: 'React Native CRUD App | Build a Complete Project',
    youtubeVideoId: 'FRpLxVuIhSw',
    order: 4,
  },

  {
    name: 'React Native Data Storage, Theme Toggle, Animations & Fonts',
    youtubeVideoId: 'Af3w1LYgiHY',
    order: 5,
  }
];

const mockLessonsCourse2: Pick<typeof LessonTable.$inferInsert, 'name' | 'youtubeVideoId'>[] = [
  {
    name: 'Lesson 1 - Introduction',
    youtubeVideoId: 'ZjAqacIC_3c',
  },
  {
    name: 'Lesson 2 - Hello World',
    youtubeVideoId: 'kVddMV-TrSw',
  },
  {
    name: 'Lesson 3 - Project Structure',
    youtubeVideoId: 'FmerxXWD66g',
  },
  {
    name: 'Lesson 4 - Before We Start',
    youtubeVideoId: 'x7oQC_R_yVo',
  },
  {
    name: 'Lesson 5 - Routing',
    youtubeVideoId: 'Vm7qM1wmXwE',
  },

  {
    name: 'Lesson 6 - Nested Routes',
    youtubeVideoId: 'mEral6yz130',
  },
  {
    name: 'Lesson 7 - Dynamic Routes',
    youtubeVideoId: 'N4-EkNJ6RFM',
  },
  {
    name: 'Lesson 8 - Nested Dynamic Routes',
    youtubeVideoId: 'Vn4p4K6_M44',
  }
];

const mockLessonsCourse3: Pick<typeof LessonTable.$inferInsert, 'name' | 'youtubeVideoId'>[] = [
  {
    name: 'Introduction',
    youtubeVideoId: '_QCt3UBTS1Y',
  },
  {
    name: 'How to Tune Your Guitar For Beginners',
    youtubeVideoId: 'X2EmpWr9vUc',
  },
  {
    name: 'How to (Really) Hold a Guitar When Playing',
    youtubeVideoId: 'MlV6WhM9YhE',
  },
  {
    name: 'How To Avoid Finger Pain When Learning Guitar',
    youtubeVideoId: 'VB0vWNqNMbA',
  },
  {
    name: 'How to Read Guitar Chord Charts',
    youtubeVideoId: 'LlN2yrFQKzY',
  },
  {
    name: 'How to Strum a Guitar WITHOUT a Pick',
    youtubeVideoId: 'j-ljksb6oIY',
  },
  {
    name: 'How to Play the D Chord on Guitar',
    youtubeVideoId: 'QkrIZBLZEXw',
  }
];

export const mockLessonsByCourse = [mockLessonsCourse1, mockLessonsCourse2, mockLessonsCourse3];
