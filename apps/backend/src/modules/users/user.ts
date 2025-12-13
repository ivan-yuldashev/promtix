import type { z } from 'zod';

import type { userSchema } from '@/modules/users/user.schema';

export type User = z.infer<typeof userSchema>;
