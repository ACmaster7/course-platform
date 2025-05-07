import { env } from '@/data/env/server';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  strict: true,
  verbose: true,
  dialect: 'postgresql',
  dbCredentials: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    host: env.DB_HOST,
    ssl: false,
  },
});
