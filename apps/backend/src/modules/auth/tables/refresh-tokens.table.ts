import type { WithoutBaseEntity } from '@/shared/types/utils.types';

import { relations } from 'drizzle-orm';
import { boolean, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { usersTable } from '@/modules/users/tables/users.table';

export const refreshTokensTable = pgTable(
  'refresh_tokens',
  {
    ...baseColumns,

    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),

    expiresAt: timestamp('expires_at', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
    jti: uuid('jti').notNull().unique(),

    revoked: boolean('revoked').default(false).notNull(),
  },
);

export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}));

export type RefreshToken = typeof refreshTokensTable.$inferSelect;
export type RefreshTokenInsert = WithoutBaseEntity<typeof refreshTokensTable.$inferInsert>;
