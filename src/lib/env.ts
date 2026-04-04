import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isProduction = process.env.NODE_ENV === 'production';

export const env = createEnv({
  /*
   * Server-side environment variables schema.
   * These are not exposed to the client.
   */
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /*
   * Client-side environment variables schema.
   * Prefix with NEXT_PUBLIC_ to expose to the browser.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: isProduction
      ? z.string().url()
      : z.string().url().optional().or(z.literal('')),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: isProduction
      ? z.string().min(1)
      : z.string().min(1).optional().or(z.literal('')),
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .url()
      .optional()
      .default('http://localhost:3000'),
  },

  /*
   * Runtime values — must destructure all vars here for Next.js bundling.
   */
  runtimeEnv: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  /*
   * Skip validation in dev when Supabase vars aren't set.
   * The app uses mock data in this scenario.
   */
  skipValidation: !isProduction,

  /**
   * Empty strings are treated as undefined by default.
   * This lets `.env` files with empty values work in dev.
   */
  emptyStringAsUndefined: true,
});
