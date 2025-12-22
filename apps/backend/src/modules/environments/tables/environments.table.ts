import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { deploymentsTable } from '@/modules/prompts/tables/deployments.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const environmentsTable = pgTable('environments', {
  ...baseColumns,

  color: text('color').default('blue'),
  isSystem: boolean('is_system').default(false).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),

  workspaceId: uuid('workspace_id').references(() => workspacesTable.id).notNull(),
}, t => [
  uniqueIndex('env_ws_slug_idx').on(t.workspaceId, t.slug),
]);

export const environmentsRelations = relations(environmentsTable, ({ many, one }) => ({
  deployments: many(deploymentsTable),
  workspace: one(workspacesTable, {
    fields: [environmentsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectEnvironment = typeof environmentsTable.$inferSelect;
export type InsertEnvironment = typeof environmentsTable.$inferInsert;
