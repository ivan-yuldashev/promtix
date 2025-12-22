import { z } from 'zod';

export const slugSchema = z
  .string()
  .min(3)
  .max(60)
  .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens');
