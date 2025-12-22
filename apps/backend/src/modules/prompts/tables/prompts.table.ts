import { relations } from 'drizzle-orm';
import { index, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { projectsTable } from '@/modules/projects/tables/projects.table';
import { deploymentsTable } from '@/modules/prompts/tables/deployments.table';
import { promptVersionsTable } from '@/modules/prompts/tables/prompt-versions.table';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const promptsTable = pgTable('prompts', {
  ...baseColumns,

  description: text('description'),
  name: text('name').notNull(),
  slug: text('slug').notNull(),

  createdById: uuid('created_by_id').references(() => usersTable.id),
  projectId: uuid('project_id').references(() => projectsTable.id).notNull(),
  workspaceId: uuid('workspace_id').references(() => workspacesTable.id).notNull(),
}, t => [
  uniqueIndex('prompt_project_slug_idx').on(t.projectId, t.slug),
  index('prompt_ws_idx').on(t.workspaceId),
]);

export const promptsRelations = relations(promptsTable, ({ many, one }) => ({
  createdBy: one(usersTable, {
    fields: [promptsTable.createdById],
    references: [usersTable.id],
  }),
  deployments: many(deploymentsTable),
  project: one(projectsTable, {
    fields: [promptsTable.projectId],
    references: [projectsTable.id],
  }),
  promptVersions: many(promptVersionsTable),
  workspace: one(workspacesTable, {
    fields: [promptsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectPrompt = typeof promptsTable.$inferSelect;
export type InsertPrompt = typeof promptsTable.$inferInsert;
