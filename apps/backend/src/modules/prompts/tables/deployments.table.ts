import { relations } from 'drizzle-orm';
import { index, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { environmentsTable } from '@/modules/environments/tables/environments.table';
import { promptVersionsTable } from '@/modules/prompts/tables/prompt-versions.table';
import { promptsTable } from '@/modules/prompts/tables/prompts.table';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const deploymentsTable = pgTable('deployments', {
  ...baseColumns,

  environmentSlug: text('environment_slug')
    .references(() => environmentsTable.slug, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),

  promptId: uuid('prompt_id')
    .references(() => promptsTable.id, { onDelete: 'cascade' })
    .notNull(),

  promptVersionId: uuid('prompt_version_id')
    .references(() => promptVersionsTable.id)
    .notNull(),

  updatedById: uuid('updated_by_id').references(() => usersTable.id),
  workspaceId: uuid('workspace_id').references(() => workspacesTable.id).notNull(),
}, t => [
  uniqueIndex('active_deploy_idx').on(t.promptId, t.environmentSlug),
  index('deploy_prompt_version_idx').on(t.promptVersionId),
  index('deploy_ws_idx').on(t.workspaceId),
]);

export const deploymentsRelations = relations(deploymentsTable, ({ one }) => ({
  environment: one(environmentsTable, {
    fields: [deploymentsTable.environmentSlug],
    references: [environmentsTable.slug],
  }),
  prompt: one(promptsTable, {
    fields: [deploymentsTable.promptId],
    references: [promptsTable.id],
  }),
  promptVersion: one(promptVersionsTable, {
    fields: [deploymentsTable.promptVersionId],
    references: [promptVersionsTable.id],
  }),
  updatedBy: one(usersTable, {
    fields: [deploymentsTable.updatedById],
    references: [usersTable.id],
  }),
  workspace: one(workspacesTable, {
    fields: [deploymentsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectDeployment = typeof deploymentsTable.$inferSelect;
export type InsertDeployment = typeof deploymentsTable.$inferInsert;
