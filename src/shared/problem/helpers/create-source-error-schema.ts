import z from 'zod';

import type { NonBodyTarget } from '@/shared/problem/types';

import { sourceErrorSchema } from '@/shared/problem/schemas/base-problem-schema';

export function createSourceErrorSchema(target: NonBodyTarget) {
  return sourceErrorSchema.safeExtend({
    source: z.object({
      in: z.literal(target),
      parameter: z.string(),
    }),
  });
}
