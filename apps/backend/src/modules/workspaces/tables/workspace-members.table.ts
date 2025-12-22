import { relations } from 'drizzle-orm';
import { index, pgEnum, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { baseColumns } from '@/infrastructure/db/base-columns';
import { usersTable } from '@/modules/users/tables/users.table';
import { Role } from '@/modules/workspaces/constants/role';
import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';

const roles = Object.values(Role) as [Role.EDITOR, ...Role[]];
const roleEnum = pgEnum('user_role', roles);

export const workspaceMembersTable = pgTable('workspace_members', {
  ...baseColumns,

  role: roleEnum('role').notNull(),

  workspaceId: uuid('workspace_id')
    .references(() => workspacesTable.id, { onDelete: 'cascade' }),

  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
}, t => [
  uniqueIndex('member_unique_idx').on(t.workspaceId, t.userId),
  index('member_user_idx').on(t.userId),
]);

export const workspaceMembersRelations = relations(workspaceMembersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [workspaceMembersTable.userId],
    references: [usersTable.id],
  }),
  workspace: one(workspacesTable, {
    fields: [workspaceMembersTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export type SelectWorkspaceMember = typeof workspaceMembersTable.$inferSelect;
export type InsertWorkspaceMember = typeof workspaceMembersTable.$inferInsert;
