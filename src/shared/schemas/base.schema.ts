import { z } from 'zod';

export const baseSchema = z.object({
  createdAt: z.date(),
  id: z.uuid(),
  updatedAt: z.date(),
});
