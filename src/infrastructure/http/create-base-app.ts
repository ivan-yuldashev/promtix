import type { MiddlewareHandler } from 'hono';

import { requestId } from 'hono/request-id';

import { createRouter } from '@/infrastructure/http/create-router';
import { notFound } from '@/infrastructure/http/helpers/not-found';
import { onError } from '@/infrastructure/http/helpers/on-error';
import { createPinoLogger } from '@/infrastructure/logging/create-pino-logger';
import { servicesMiddleware } from '@/infrastructure/services/services-middleware';

export function createBaseApp(middlewares: MiddlewareHandler[] = []) {
  const app = createRouter();

  app.use(requestId(), createPinoLogger(), servicesMiddleware, ...middlewares);

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
