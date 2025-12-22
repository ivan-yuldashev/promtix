import type { DbExecutor } from '@/infrastructure/db/types';

import { AsyncLocalStorage } from 'node:async_hooks';

import { db } from '@/infrastructure/db/db';

export const dbContext = new AsyncLocalStorage<DbExecutor>();

export function getExecutor(): DbExecutor {
  const store = dbContext.getStore();
  return store ?? db;
}
