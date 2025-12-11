import { z } from 'zod';

export function createPaginatedResponseSchema<S extends z.ZodSchema>(schema: S) {
  return z.object({
    docs: z.array(schema),
    total: z.number().min(0).default(0),
  });
}
