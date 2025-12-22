import { z } from 'zod';

import { publicUserSchema } from '@/modules/users/schemas/users.schema';

const credentialsSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(128),
});

const authResponseSchema = z.object({ accessToken: z.string(), user: publicUserSchema });

export const loginRequestSchema = credentialsSchema;
export const loginResponseSchema = authResponseSchema;

export const registerRequestSchema = credentialsSchema.extend({
  name: z.string().optional(),
});
export const registerResponseSchema = authResponseSchema;

export const refreshResponseSchema = z.object({ accessToken: z.string() });
