import type { Problem, ProblemOptions, TargetValue, ValidationProblem } from '@/shared/problem/types';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { HttpErrorDetails } from '@/shared/problem/constants/http-error-details';
import { ErrorReasonPhrases } from '@/shared/problem/constants/http-status-reason-phrases';
import { isBodyLikeTarget } from '@/shared/problem/helpers/is-body-like-target';
import { zodToErrors } from '@/shared/problem/helpers/zod-to-errors';

interface ProblemParams<N> {
  instance: string;
  message?: string;
  requestId: string;
  statusName: N;
}

function hasValidation<T extends TargetValue>(
  params: ProblemParams<HttpErrorStatusName> | (ProblemParams<HttpErrorStatusName> & ProblemOptions<T>),
): params is ProblemParams<HttpErrorStatusName> & ProblemOptions<T> {
  return 'zodError' in params && 'target' in params;
}

export function createProblem<N extends HttpErrorStatusName>(params: ProblemParams<N>): Problem<N>;

export function createProblem<N extends HttpErrorStatusName, T extends TargetValue>(
  params: ProblemParams<N> & ProblemOptions<T>,
): ValidationProblem<N>;

export function createProblem<N extends HttpErrorStatusName, T extends TargetValue = never>(
  params: ProblemParams<N> | (ProblemParams<N> & ProblemOptions<T>),
): Problem<N> | ValidationProblem<N> {
  const { instance, message, requestId, statusName } = params;
  const status = HttpStatusCodes[statusName];
  const detail = message ?? HttpErrorDetails[statusName];

  const base = {
    code: statusName,
    detail,
    instance,
    requestId,
    status,
    title: ErrorReasonPhrases[statusName],
  };

  if (hasValidation(params)) {
    const errors = isBodyLikeTarget(params.target)
      ? zodToErrors(params.zodError, params.target)
      : zodToErrors(params.zodError, params.target);

    return {
      ...base,
      errors,
    };
  }

  return base;
}
