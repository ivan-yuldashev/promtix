import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'node:path';
import { z } from 'zod';

import { NodeEnv } from '@/infrastructure/config/constants/node-env';
import { DurationUnit } from '@/shared/constants/duration-unit';
import { LogLevel } from '@/shared/constants/log-level';

const { parsed } = expand(
  config({
    override: true,
    // eslint-disable-next-line node/no-process-env
    path: path.resolve(process.cwd(), process.env.NODE_ENV === NodeEnv.TEST ? '.env.test' : '.env'),
  }),
);

const BaseEnvSchema = z.object({
  LOG_LEVEL: z.enum(LogLevel).default(LogLevel.INFO),
  PORT: z.coerce.number().default(3000),

  ACCESS_TOKEN_SECRET: z.string().min(12),
  ACCESS_TOKEN_TTL: z.templateLiteral([z.number(), z.enum(DurationUnit)]).default('15m'),
  COOKIE_NAME: z.string().default('refresh'),
  REFRESH_TOKEN_SECRET: z.string().min(12),
  REFRESH_TOKEN_TTL: z.templateLiteral([z.number(), z.enum(DurationUnit)]).default('7d'),
});

const EnvSchema = z.union([
  BaseEnvSchema.extend({
    NODE_ENV: z.enum(NodeEnv).exclude(['TEST']).default(NodeEnv.DEVELOPMENT),

    DATABASE_URI: z.string().min(1),

    DATABASE_NAME: z.undefined().optional(),
    DATABASE_PASSWORD: z.undefined().optional(),
    DATABASE_PORT: z.undefined().optional(),
    DATABASE_USER: z.undefined().optional(),
  }),
  BaseEnvSchema.extend({
    NODE_ENV: z.enum(NodeEnv).default(NodeEnv.DEVELOPMENT),

    DATABASE_URI: z.undefined().optional(),

    DATABASE_NAME: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    DATABASE_PORT: z.coerce.number().min(1).max(65535),
    DATABASE_USER: z.string().min(1),
  }),
]);

const { data, error } = EnvSchema.safeParse(parsed);

if (error) {
  console.error('⚠️ Invalid env:');
  console.error(JSON.stringify(z.treeifyError(error), null, 2));
  process.exit(1);
}

const env = data;

const isDevelopment = env.NODE_ENV === NodeEnv.DEVELOPMENT;
const isProduction = env.NODE_ENV === NodeEnv.PRODUCTION;
const isTest = env.NODE_ENV === NodeEnv.TEST;

const databaseUri =
  typeof env.DATABASE_URI === 'string'
    ? env.DATABASE_URI
    : `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@localhost:${env.DATABASE_PORT}/${env.DATABASE_NAME}`;

export { databaseUri, env, isDevelopment, isProduction, isTest };

export type Env = z.infer<typeof EnvSchema>;
