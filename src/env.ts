import { z } from "zod";

const envSchema = z.object({
  DEPLOY_URL: z.string(),
});

const _env = envSchema.safeParse({
  DEPLOY_URL: process.env.DEPLOY_URL,
});

if (!_env.success) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables", _env.error.format());
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(_env.error.format())}`,
  );
}

export const env = _env.data;
