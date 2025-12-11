import type { Context, TypedResponse, ValidationTargets } from 'hono';
import type { ClientErrorStatusCode, ServerErrorStatusCode } from 'hono/utils/http-status';
import type { JSONParsed, JSONValue } from 'hono/utils/types';

import type { ErrorStatusCode, Problem, ProblemOptions, ValidationProblem } from '@/shared/problem/types';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { createProblem } from '@/shared/problem/create-problem';

type JSONRespondReturn<T extends JSONValue, U extends ClientErrorStatusCode | ServerErrorStatusCode> = Response &
  TypedResponse<JSONParsed<T>, U, 'json'>;

export function problemResponse<N extends HttpErrorStatusName>(
  c: Context,
  statusName: N,
  options?: { message?: string },
): JSONRespondReturn<Problem<N>, ErrorStatusCode<N>>;

export function problemResponse<N extends HttpErrorStatusName, T extends keyof ValidationTargets>(
  c: Context,
  statusName: N,
  options: ProblemOptions<T>,
): JSONRespondReturn<ValidationProblem<N>, ErrorStatusCode<N>>;

export function problemResponse<N extends HttpErrorStatusName, T extends keyof ValidationTargets = never>(
  c: Context,
  statusName: N,
  options?: { message?: string } | ProblemOptions<T>,
): JSONRespondReturn<Problem<N>, ErrorStatusCode<N>> | JSONRespondReturn<ValidationProblem<N>, ErrorStatusCode<N>> {
  const status = HttpStatusCodes[statusName];
  const requestId = c.var.requestId;
  const instance = c.req.path;

  const problem = createProblem({ instance, requestId, statusName, ...options });

  return c.json(problem, status, {
    'Content-Type': 'application/problem+json',
  });
}
