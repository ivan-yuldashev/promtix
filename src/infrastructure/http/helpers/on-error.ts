import type { Context } from 'hono';

import { DrizzleQueryError } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { DatabaseError } from 'pg';

import type { AppBindings } from '@/app/types';

import { ClientErrorStatusCodes, ServerErrorStatusCodes } from '@/shared/constants/http-status-codes';
import { HttpStatusName } from '@/shared/constants/http-status-name';
import { LogLevel } from '@/shared/constants/log-level';
import { problemResponse } from '@/shared/problem/helpers/problem-response';
import { problem } from '@/shared/problem/problem';
import { valueToKeyMap } from '@/shared/utils/value-to-key-map';

export const HTTP_ERROR_CODE_TO_NAME_MAP = valueToKeyMap({
  ...ClientErrorStatusCodes,
  ...ServerErrorStatusCodes,
});

export function onError(error: Error, c: Context<AppBindings>) {
  const { method, path } = c.req;
  const logger = c.get('logger');

  const context = {
    request: {
      method,
      path,
    },
    requestId: c.var.requestId,
  };

  if (error instanceof DrizzleQueryError && error.cause instanceof DatabaseError) {
    const { code = '' } = error.cause;

    logger.warn({ ...context, err: error }, `Handled DatabaseError: ${error.message}`);

    switch (code) {
      case '22001':
      case '22003':
      case '22P02':
        return problem.badRequest(c);

      case '23502':
      case '23503':
      case '23514':
        return problem.unprocessableEntity(c);

      case '23505':
        return problem.conflict(c);

      default:
        return problem.serverError(c);
    }
  }

  if (error instanceof HTTPException) {
    const { status } = error;

    const logLevel = status < 500 && status !== -1 ? LogLevel.WARN : LogLevel.ERROR;
    const errorCodeName: HttpStatusName | undefined =
      HTTP_ERROR_CODE_TO_NAME_MAP[status as keyof typeof HTTP_ERROR_CODE_TO_NAME_MAP];

    logger[logLevel]({ ...context, err: error }, `Handled HTTPException: ${error.message}`);

    if (errorCodeName === undefined) {
      logger.error(
        { ...context, error },
        `HTTPException thrown with non-error status code: ${error.status}. Message: ${error.message}`,
      );
    }

    return problemResponse(c, errorCodeName ?? HttpStatusName.INTERNAL_SERVER_ERROR);
  }

  logger.error({ ...context, err: error }, `Unhandled error caught: ${error.message}`);

  return problem.serverError(c);
}
