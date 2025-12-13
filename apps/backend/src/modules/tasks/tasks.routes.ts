import { createRoute } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { IdUUIDParamsSchema } from 'stoker/openapi/schemas';

import { createTaskRequestSchema, patchTaskRequestSchema, taskResponseSchema } from '@/modules/tasks/task.schemas';
import { HttpStatusName } from '@/shared/constants/http-status-name';
import { V1Path } from '@/shared/constants/paths';
import { createPaginatedResponseSchema } from '@/shared/helpers/create-paginated-response-schema';
import { internalServerErrorResponse, unauthorizedResponse } from '@/shared/openapi/common-responses';
import { createProblemSchemaWithExample } from '@/shared/problem/create-problem-schema-with-example';
import { paginationSchema } from '@/shared/schemas/pagination.schema';

const tags = ['Tasks'];
const pathWithId = `${V1Path.TASKS}/${crypto.randomUUID()}`;

const baseTaskRoute = {
  responses: {
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
  security: [{ bearerAuth: [] }],
  tags,
};

const taskNotFoundResponse = {
  [HttpStatusCodes.NOT_FOUND]: jsonContent(
    createProblemSchemaWithExample(HttpStatusName.NOT_FOUND, pathWithId),
    'Task not found',
  ),
};

const invalidIdResponse = {
  [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
    createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, pathWithId, {
      schema: IdUUIDParamsSchema,
      target: 'param',
    }),
    'Invalid id error',
  ),
};

export const list = createRoute({
  ...baseTaskRoute,
  method: 'get',
  path: V1Path.TASKS,
  request: {
    query: paginationSchema,
  },
  responses: {
    ...baseTaskRoute.responses,
    [HttpStatusCodes.OK]: jsonContent(createPaginatedResponseSchema(taskResponseSchema), 'The list of tasks'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, V1Path.TASKS, {
        schema: paginationSchema,
        target: 'query',
      }),
      'The validation error(s)',
    ),
  },
});

export const create = createRoute({
  ...baseTaskRoute,
  method: 'post',
  path: V1Path.TASKS,
  request: {
    body: jsonContentRequired(createTaskRequestSchema, 'The task to create'),
  },
  responses: {
    ...baseTaskRoute.responses,
    [HttpStatusCodes.CREATED]: jsonContent(taskResponseSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, V1Path.TASKS, {
        schema: createTaskRequestSchema,
        target: 'json',
      }),
      'The validation error(s)',
    ),
  },
});

export const getOne = createRoute({
  ...baseTaskRoute,
  method: 'get',
  path: V1Path.TASK,
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    ...baseTaskRoute.responses,
    ...taskNotFoundResponse,
    ...invalidIdResponse,
    [HttpStatusCodes.OK]: jsonContent(taskResponseSchema, 'The requested task'),
  },
});

export const patch = createRoute({
  ...baseTaskRoute,
  method: 'patch',
  path: V1Path.TASK,
  request: {
    body: jsonContentRequired(patchTaskRequestSchema, 'The task updates'),
    params: IdUUIDParamsSchema,
  },
  responses: {
    ...baseTaskRoute.responses,
    ...taskNotFoundResponse,
    [HttpStatusCodes.OK]: jsonContent(taskResponseSchema, 'The updated task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, pathWithId, {
        schema: patchTaskRequestSchema,
        target: 'json',
      }).or(
        createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, pathWithId, {
          schema: IdUUIDParamsSchema,
          target: 'param',
        }),
      ),
      'The validation error(s)',
    ),
  },
});

export const remove = createRoute({
  ...baseTaskRoute,
  method: 'delete',
  path: V1Path.TASK,
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    ...baseTaskRoute.responses,
    ...taskNotFoundResponse,
    ...invalidIdResponse,
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Task deleted',
    },
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
