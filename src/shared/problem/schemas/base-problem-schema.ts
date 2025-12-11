import z from 'zod';

import { Target } from '@/shared/problem/constants/target';

const baseErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const pointerErrorSchema = baseErrorSchema.extend({
  source: z.object({
    pointer: z.string().min(1),
  }),
});

export const nonBodyTarget = z.enum(Target).exclude(['JSON', 'FORM']);

export const sourceErrorSchema = baseErrorSchema.extend({
  source: z.object({
    in: nonBodyTarget,
    parameter: z.string(),
  }),
});
