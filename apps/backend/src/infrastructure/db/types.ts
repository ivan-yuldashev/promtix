import type { db } from '@/infrastructure/db/db';

export type DbClient = typeof db;

export type DbTransaction = Parameters<Parameters<DbClient['transaction']>[0]>[0];

export type DbExecutor = DbClient | DbTransaction;
