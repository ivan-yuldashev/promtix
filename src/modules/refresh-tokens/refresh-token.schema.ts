import { z } from 'zod';

import { baseSchema } from '@/shared/schemas/base.schema';

export const refreshToken = baseSchema.extend({
  expiresAt: z.date(),
  jti: z.uuid(),
  revoked: z.boolean(),
  userId: z.uuid(),
});
