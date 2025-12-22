import type { WithoutBaseEntity } from '@/shared/types/utils.types';

import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { refreshTokensTable } from '@/modules/auth/tables/refresh-tokens.table';
import { workspaceMembersTable } from '@/modules/workspaces/tables/workspace-members.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const usersTable = pgTable('users', {
  ...baseColumns,

  hash: text('hash').notNull(),

  email: text('email').notNull().unique(),
  name: text('name'),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  memberships: many(workspaceMembersTable),
  ownedWorkspaces: many(workspacesTable),
  refreshTokens: many(refreshTokensTable),
}));

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = WithoutBaseEntity<typeof usersTable.$inferInsert>;
