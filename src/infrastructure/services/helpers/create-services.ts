import type { InferSelectModel } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

import { getTableName } from 'drizzle-orm';

import type { BaseFieldsName } from '@/shared/types/utils';

import { BaseRepository } from '@/shared/core/base.repository';
import { BaseService } from '@/shared/core/base.service';

type BaseTable = PgTable & Record<BaseFieldsName, PgColumn>;

export type ServicesMap<T extends readonly BaseTable[]> = {
  [K in T[number]['_']['name']]: BaseService<InferSelectModel<Extract<T[number], { _: { name: K } }>>>;
};

export function createServices<T extends readonly BaseTable[]>(tables: T): ServicesMap<T> {
  return tables.reduce((acc, table) => {
    (acc as Record<string, unknown>)[getTableName(table)] = new BaseService(new BaseRepository(table));

    return acc;
  }, {} as ServicesMap<T>);
}
