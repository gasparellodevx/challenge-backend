import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
  EMAIL_FROM: z.string(),
  BULL_REDIS_URL: z.string().url(),
  CACHE_TTL: z.coerce.number().default(60),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: Partial<Env>): Env {
  return envSchema.parse(env);
}
