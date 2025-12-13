import type { AppBindings } from '@/app/types';

import { OpenAPIHono } from '@hono/zod-openapi';

import { defaultHook } from '@/infrastructure/http/helpers/default-hook';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  });
}
