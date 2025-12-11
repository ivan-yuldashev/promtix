import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { baseSchema } from '@/infrastructure/db/schema/base';
import { users } from '@/infrastructure/db/schema/user';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    expiresAt: timestamp('expires_at', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
    jti: uuid('jti').notNull().unique(),
    revoked: boolean('revoked').default(false).notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    ...baseSchema,
  },
  (table) => ({
    userIdIdx: index('refresh_tokens_user_id_idx').on(table.userId),
  }),
);

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));
