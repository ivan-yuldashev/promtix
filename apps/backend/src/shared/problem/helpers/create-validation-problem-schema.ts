import type { TargetValue } from '@/shared/problem/types';
import type { HttpErrorStatusName } from '@/shared/types/statuses';

import { z } from 'zod';

import { createProblemSchema } from '@/shared/problem/helpers/create-problem-schema';
import { createSourceErrorSchema } from '@/shared/problem/helpers/create-source-error-schema';
import { isBodyLikeTarget } from '@/shared/problem/helpers/is-body-like-target';
import { pointerErrorSchema } from '@/shared/problem/schemas/base-problem-schema';

export function createValidationProblemSchema<N extends HttpErrorStatusName>(statusName: N, target: TargetValue) {
  const errorSchema = isBodyLikeTarget(target) ? pointerErrorSchema : createSourceErrorSchema(target);
  return createProblemSchema(statusName).extend({
    code: z.literal(statusName),
    errors: z.array(errorSchema).min(1),
  });
}
