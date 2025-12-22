import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const apiKeysTable = pgTable('api_keys', {
  ...baseColumns,

  hash: text('hash').notNull(),
  name: text('name').notNull(),
  prefix: text('prefix').notNull(),

  revoked: boolean('revoked').default(false).notNull(),

  createdById: uuid('created_by_id').references(() => usersTable.id),
  workspaceId: uuid('workspace_id').references(() => workspacesTable.id).notNull(),
}, t => [
  uniqueIndex('api_keys_hash_idx').on(t.hash),
  index('api_keys_ws_idx').on(t.workspaceId),
]);

export const apiKeysRelations = relations(apiKeysTable, ({ one }) => ({
  createdBy: one(usersTable, {
    fields: [apiKeysTable.createdById],
    references: [usersTable.id],
  }),
  workspace: one(workspacesTable, {
    fields: [apiKeysTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectApiKey = typeof apiKeysTable.$inferSelect;
export type InsertApiKey = typeof apiKeysTable.$inferInsert;
