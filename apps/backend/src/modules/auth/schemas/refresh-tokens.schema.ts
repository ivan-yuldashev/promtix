import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { refreshTokensTable } from '@/modules/auth/tables/refresh-tokens.table';

export const selectRefreshToken = createSelectSchema(refreshTokensTable);
export const insertRefreshToken = createInsertSchema(refreshTokensTable);

export const refreshTokenPayloadSchema = z.object({
  jti: z.string(),
  sub: z.uuid(),
});
