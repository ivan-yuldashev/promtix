import basePino from 'pino';

import { env, isProduction } from '@/infrastructure/config/env';

export const pino = basePino({
  level: env.LOG_LEVEL,
  ...(isProduction
    ? {}
    : {
        transport: {
          options: { colorize: true },
          target: 'hono-pino/debug-log',
        },
      }),
});
