import { z } from 'zod';

import { userSchema } from '@/modules/users/user.schema';

const authRequestSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(128),
});

const publicUserSchema = userSchema.omit({ hash: true });
const authResponseSchema = z.object({ accessToken: z.string(), user: publicUserSchema });

export const loginRequestSchema = authRequestSchema;
export const loginResponseSchema = authResponseSchema;

export const registerRequestSchema = authRequestSchema;
export const registerResponseSchema = authResponseSchema;

export const refreshResponseSchema = z.object({ accessToken: z.string() });
