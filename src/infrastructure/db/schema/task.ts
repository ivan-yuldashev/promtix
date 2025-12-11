import { desc } from 'drizzle-orm';
import { boolean, index, pgTable, varchar } from 'drizzle-orm/pg-core';

import { baseSchema } from '@/infrastructure/db/schema/base';

export const tasks = pgTable(
  'tasks',
  {
    done: boolean().notNull().default(false),
    name: varchar('name', { length: 200 }).notNull(),
    ...baseSchema,
  },
  (t) => [index('created_at_idx').on(desc(t.createdAt))],
);
