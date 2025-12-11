import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseSchema = {
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
  id: uuid('id').primaryKey().defaultRandom(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
