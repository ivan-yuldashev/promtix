import type { ValidationTargets } from 'hono';
import type { z } from 'zod';

import type { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import type { Target } from '@/shared/problem/constants/target';
import type { createProblemSchema } from '@/shared/problem/helpers/create-problem-schema';
import type { createValidationProblemSchema } from '@/shared/problem/helpers/create-validation-problem-schema';
import type {
  nonBodyTarget,
  pointerErrorSchema,
  sourceErrorSchema,
} from '@/shared/problem/schemas/base-problem-schema';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

export interface ProblemOptions<T extends keyof ValidationTargets> {
  target: T;
  zodError: z.ZodError;
}

export type ValidationProblem<C extends HttpErrorStatusName> = z.infer<
  ReturnType<typeof createValidationProblemSchema<C>>
>;
export type Problem<C extends HttpErrorStatusName> = z.infer<ReturnType<typeof createProblemSchema<C>>>;
export type TargetValue = (typeof Target)[keyof typeof Target];
export type BodyLikeTarget = typeof Target.FORM | typeof Target.JSON;
export type NonBodyTarget = z.infer<typeof nonBodyTarget>;
export type PointerError = z.infer<typeof pointerErrorSchema>;
export type SourceError = z.infer<typeof sourceErrorSchema>;

export type ErrorStatusCode<C extends HttpErrorStatusName> = (typeof HttpStatusCodes)[C];
