import type { ValidationTargets } from 'hono';

import type { TargetValue } from '@/shared/problem/types';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

import { z } from '@hono/zod-openapi';

import { createProblem } from '@/shared/problem/create-problem';
import { createProblemSchema } from '@/shared/problem/helpers/create-problem-schema';
import { createValidationProblemSchema } from '@/shared/problem/helpers/create-validation-problem-schema';

interface Options<T extends TargetValue> {
  message?: string;
  schema: z.ZodSchema;
  target: T;
}

type ValidationProblemSchema<N extends HttpErrorStatusName> = ReturnType<typeof createValidationProblemSchema<N>>;
type ProblemSchema<N extends HttpErrorStatusName> = ReturnType<typeof createProblemSchema<N>>;

function hasValidation<T extends TargetValue>(options: Options<T>): options is Options<T> {
  return 'schema' in options && 'target' in options;
}

export function createProblemSchemaWithExample<N extends HttpErrorStatusName>(
  statusName: N,
  instance: string,
  options?: { message?: string },
): ProblemSchema<N>;

export function createProblemSchemaWithExample<N extends HttpErrorStatusName, T extends keyof ValidationTargets>(
  statusName: N,
  instance: string,
  options: Options<T>,
): ValidationProblemSchema<N>;

export function createProblemSchemaWithExample<
  N extends HttpErrorStatusName,
  T extends keyof ValidationTargets = never,
>(
  statusName: N,
  instance: string,
  options: { message?: string } | Options<T> = {},
): ProblemSchema<N> | ValidationProblemSchema<N> {
  const withValidation = 'target' in options;
  const withCustomMessage = 'message' in options;
  const message = withCustomMessage ? options.message : undefined;

  const example = createProblem({
    instance,
    requestId: crypto.randomUUID(),
    statusName,
    ...(message !== undefined && { message }),
    ...(withValidation && {
      target: options.target,
      zodError: options.schema.safeParse(options.schema instanceof z.ZodArray ? {} : 123).error,
    }),
  });

  if (withValidation && hasValidation(options)) {
    return createValidationProblemSchema(statusName, options.target).openapi({ example });
  }

  return createProblemSchema(statusName, message).openapi({ example });
}
