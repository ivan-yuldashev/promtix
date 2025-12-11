import { pinoLogger as logger } from 'hono-pino';

import { pino } from '@/infrastructure/logging/pino';

export function createPinoLogger() {
  return logger({
    pino,
  });
}
