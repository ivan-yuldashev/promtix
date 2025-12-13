import { z } from 'zod';

import { baseSchema } from '@/shared/schemas/base.schema';

export const userSchema = baseSchema.extend({
  email: z.email(),
  hash: z.string(),
});
