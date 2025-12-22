import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { usersTable } from '@/modules/users/tables/users.table';

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable).omit({ createdAt: true, id: true, updatedAt: true });

export const publicUserSchema = selectUserSchema.omit({ hash: true });
