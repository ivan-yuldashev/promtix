import { z } from 'zod';

import { baseSchema } from '@/shared/schemas/base.schema';

export const taskSchema = baseSchema.extend({
  done: z.boolean().default(false),
  name: z.string().min(1).max(200),
});

export const taskResponseSchema = taskSchema;

export const createTaskRequestSchema = taskSchema.omit({
  createdAt: true,
  id: true,
  updatedAt: true,
});

export const patchTaskRequestSchema = taskSchema
  .omit({
    createdAt: true,
    id: true,
    updatedAt: true,
  })
  .partial();
