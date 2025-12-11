import { createRoute } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import {
  loginRequestSchema,
  loginResponseSchema,
  refreshResponseSchema,
  registerRequestSchema,
  registerResponseSchema,
} from '@/modules/auth/auth.schemas';
import { HttpStatusName } from '@/shared/constants/http-status-name';
import { Path } from '@/shared/constants/path';
import { internalServerErrorResponse, unauthorizedResponse } from '@/shared/openapi/common-responses';
import { createProblemSchemaWithExample } from '@/shared/problem/create-problem-schema-with-example';

const tags = ['Auth'];

const baseAuthRoute = {
  responses: {
    ...internalServerErrorResponse,
  },
  tags,
};

export const login = createRoute({
  ...baseAuthRoute,
  method: 'post',
  path: Path.LOGIN,
  request: {
    body: jsonContentRequired(loginRequestSchema, 'Login'),
  },
  responses: {
    ...baseAuthRoute.responses,
    [HttpStatusCodes.OK]: jsonContent(loginResponseSchema, 'Login successful'),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNAUTHORIZED, '/', { message: 'Login or password is incorrect' }),
      'Login or password is incorrect',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, Path.LOGIN, {
        schema: loginRequestSchema,
        target: 'json',
      }),
      'The validation error(s)',
    ),
  },
});

export const logout = createRoute({
  ...baseAuthRoute,
  method: 'post',
  path: Path.LOGOUT,
  responses: {
    ...baseAuthRoute.responses,
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'User logged out',
    },
  },
});

export const refresh = createRoute({
  ...baseAuthRoute,
  method: 'post',
  path: Path.REFRESH_TOKEN,
  responses: {
    ...unauthorizedResponse,
    ...baseAuthRoute.responses,
    [HttpStatusCodes.OK]: jsonContent(refreshResponseSchema, 'Refresh successful'),
  },
  security: [{ cookieAuth: [] }],
});

export const register = createRoute({
  ...baseAuthRoute,
  method: 'post',
  path: Path.REGISTER,
  request: {
    body: jsonContentRequired(registerRequestSchema, 'Register'),
  },
  responses: {
    ...baseAuthRoute.responses,
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.CONFLICT, Path.REGISTER),
      'User already exists',
    ),
    [HttpStatusCodes.CREATED]: jsonContent(registerResponseSchema, 'Register successful'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createProblemSchemaWithExample(HttpStatusName.UNPROCESSABLE_ENTITY, Path.REGISTER, {
        schema: registerRequestSchema,
        target: 'json',
      }),
      'The validation error(s)',
    ),
  },
});

export type LoginRoute = typeof login;
export type LogoutRoute = typeof logout;
export type RefreshRoute = typeof refresh;
export type RegisterRoute = typeof register;
