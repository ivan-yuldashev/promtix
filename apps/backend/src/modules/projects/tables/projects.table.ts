import { relations } from 'drizzle-orm';
import { jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { promptsTable } from '@/modules/prompts/tables/prompts.table';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const projectsTable = pgTable('projects', {
  ...baseColumns,

  description: text('description'),
  name: text('name').notNull(),
  // TODO: $type jsonb column
  settings: jsonb('settings').default({}),
  slug: text('slug').notNull(),

  createdById: uuid('created_by_id').references(() => usersTable.id),
  workspaceId: uuid('workspace_id')
    .references(() => workspacesTable.id, { onDelete: 'cascade' })
    .notNull(),
}, t => [
  uniqueIndex('project_ws_slug_idx').on(t.workspaceId, t.slug),
]);

export const projectsRelations = relations(projectsTable, ({ many, one }) => ({
  createdBy: one(usersTable, {
    fields: [projectsTable.createdById],
    references: [usersTable.id],
  }),
  prompts: many(promptsTable),
  workspace: one(workspacesTable, {
    fields: [projectsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectProject = typeof projectsTable.$inferSelect;
export type InsertProject = typeof projectsTable.$inferInsert;
