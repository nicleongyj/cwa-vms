import { z } from 'zod';
import dotenv from 'dotenv'

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url()
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(" Invalid enviroment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const config = parsedEnv.data;
