import { z } from 'zod';

import type { ErrorStatusCode } from '@/shared/problem/types';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { HttpErrorDetails } from '@/shared/problem/constants/http-error-details';
import { ErrorReasonPhrases } from '@/shared/problem/constants/http-status-reason-phrases';

type HttpErrorDetail<C extends HttpErrorStatusName> = (typeof HttpErrorDetails)[C];
type HttpErrorTitle<C extends HttpErrorStatusName> = (typeof ErrorReasonPhrases)[C];

export function createProblemSchema<N extends HttpErrorStatusName>(statusName: N, message?: string) {
  const httpStatusCode: ErrorStatusCode<N> = HttpStatusCodes[statusName];
  const errorDetail: HttpErrorDetail<N> = HttpErrorDetails[statusName];
  const title: HttpErrorTitle<N> = ErrorReasonPhrases[statusName];

  return z.object({
    code: z.literal(statusName),
    detail: z.literal(message ?? errorDetail),
    instance: z.string(),
    requestId: z.string(),
    status: z.literal(httpStatusCode),
    title: z.literal(title),
  });
}
