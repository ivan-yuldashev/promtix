import { createRoute } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';

import { createRouter } from '@/infrastructure/http/create-router';
import { authRouter } from '@/modules/auth/auth.index';
import { tasksRouter } from '@/modules/tasks/tasks.index';

const indexRouter = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema('Tasks API'), 'Tasks API Index'),
    },
    tags: ['Index'],
  }),
  (c) => {
    return c.json(
      {
        message: 'Tasks API',
      },
      HttpStatusCodes.OK,
    );
  },
);

export const publicRoutes = [indexRouter, authRouter] as const;
export const privateRoutes = [tasksRouter] as const;
