import { relations } from 'drizzle-orm';
import { index, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { apiKeysTable } from '@/modules/api-auth/tables/api-keys.table';
import { environmentsTable } from '@/modules/environments/tables/environments.table';
import { promptsTable } from '@/modules/prompts/tables/prompts.table';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspaceMembersTable } from '@/modules/workspaces/tables/workspace-members.table';

export const workspacesTable = pgTable('workspaces', {
  ...baseColumns,

  name: text('name').notNull(),
  // TODO: $type jsonb column
  settings: jsonb('settings').default({}),
  slug: text('slug').notNull().unique(),

  ownerId: uuid('owner_id').references(() => usersTable.id).notNull(),
}, t => [
  index('workspace_owner_idx').on(t.ownerId),
]);

export const workspacesRelations = relations(workspacesTable, ({ many, one }) => ({
  apiKeys: many(apiKeysTable),
  environments: many(environmentsTable),
  members: many(workspaceMembersTable),
  owner: one(usersTable, {
    fields: [workspacesTable.ownerId],
    references: [usersTable.id],
  }),
  prompts: many(promptsTable),
}));

export type SelectWorkspace = typeof workspacesTable.$inferSelect;
export type InsertWorkspace = typeof workspacesTable.$inferInsert;
