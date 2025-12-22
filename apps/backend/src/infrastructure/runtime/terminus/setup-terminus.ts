import type { ServerType } from '@hono/node-server';

import { createTerminus } from '@godaddy/terminus';

import { pino } from '@/infrastructure/logging/pino';
import { onHealthCheck } from '@/infrastructure/runtime/terminus/helpers/on-health-check';
import { onShutdown } from '@/infrastructure/runtime/terminus/helpers/on-shutdown';
import { onSignal } from '@/infrastructure/runtime/terminus/helpers/on-signal';
import { RootPath } from '@/shared/constants/paths';

export function setupTerminus(server: ServerType) {
  createTerminus(server, {
    healthChecks: {
      [RootPath.HEALTH]: onHealthCheck,
      verbatim: true,
    },
    onShutdown,
    onSignal,
    signals: ['SIGINT', 'SIGTERM', 'SIGQUIT'],
    timeout: 15_000,
  });

  process.on('unhandledRejection', (reason) => {
    if (reason instanceof Error) {
      pino.fatal({ err: reason }, 'Unhandled Rejection');
    }
    else {
      pino.fatal({ errorDetails: reason }, 'Unhandled Rejection');
    }

    process.exit(1);
  });

  process.on('uncaughtException', (error) => {
    pino.fatal({ err: error }, 'Uncaught Exception');
    process.exit(1);
  });
}
