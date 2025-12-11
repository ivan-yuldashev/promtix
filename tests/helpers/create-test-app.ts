import type { OpenAPIHono } from '@hono/zod-openapi';
import type { MiddlewareHandler, Schema } from 'hono';

import type { AppBindings } from '@/app/types';

import { createBaseApp } from '@/infrastructure/http/create-base-app';

export function createTestApp<S extends Schema>(
  router: OpenAPIHono<AppBindings, S>,
  middlewares?: MiddlewareHandler[],
) {
  const app = createBaseApp(middlewares);
  return app.route('/', router);
}
