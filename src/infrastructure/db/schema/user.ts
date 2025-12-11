import { relations } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { baseSchema } from '@/infrastructure/db/schema/base';
import { refreshTokens } from '@/infrastructure/db/schema/refresh-token';

export const users = pgTable('users', {
  email: varchar('email', { length: 255 }).notNull().unique(),
  hash: text('hash').notNull(),
  ...baseSchema,
});

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
}));
