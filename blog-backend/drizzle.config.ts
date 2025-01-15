import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  dialect: 'postgresql',
  schema: './models/index.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
