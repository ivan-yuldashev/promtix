import type { z } from 'zod';

import type { refreshToken } from '@/modules/refresh-tokens/refresh-token.schema';

export type RefreshToken = z.infer<typeof refreshToken>;
