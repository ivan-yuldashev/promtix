import { relations } from 'drizzle-orm';
import { index, integer, jsonb, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { deploymentsTable } from '@/modules/prompts/tables/deployments.table';
import { promptsTable } from '@/modules/prompts/tables/prompts.table';
import { usersTable } from '@/modules/users/tables/users.table';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

export const promptVersionsTable = pgTable('prompt_versions', {
  ...baseColumns,

  commitMessage: text('commit_message'),
  messages: jsonb('messages').notNull(),
  // TODO: $type
  modelConfig: jsonb('model_config').notNull(),
  version: integer('version').notNull(),

  createdById: uuid('created_by_id').references(() => usersTable.id),
  promptId: uuid('prompt_id').references(() => promptsTable.id, { onDelete: 'cascade' }).notNull(),
  workspaceId: uuid('workspace_id').references(() => workspacesTable.id).notNull(),
}, t => [
  uniqueIndex('prompt_version_unique_idx').on(t.promptId, t.version),
  index('prompt_version_ws_idx').on(t.workspaceId),
]);

export const promptVersionsRelations = relations(promptVersionsTable, ({ many, one }) => ({
  createdBy: one(usersTable, {
    fields: [promptVersionsTable.createdById],
    references: [usersTable.id],
  }),
  deployments: many(deploymentsTable),
  prompt: one(promptsTable, {
    fields: [promptVersionsTable.promptId],
    references: [promptsTable.id],
  }),
  workspace: one(workspacesTable, {
    fields: [promptVersionsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectPromptVersion = typeof promptVersionsTable.$inferSelect;
export type InsertPromptVersion = typeof promptVersionsTable.$inferInsert;
