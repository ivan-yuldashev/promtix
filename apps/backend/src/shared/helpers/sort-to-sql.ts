import type { AnyColumn } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

import type { Sort } from '@/shared/types/repository.types';
import type { BaseEntityKeys } from '@/shared/types/utils.types';

import { asc, desc } from 'drizzle-orm';

export function sortToSql<Select, Table extends PgTable>(
  sort: Sort<BaseEntityKeys | Extract<keyof Select, string>>,
  table: Table,
) {
  return sort.map(item =>
    item.startsWith('-')
      ? desc(table[item.substring(1) as Extract<keyof Table, string>] as AnyColumn)
      : asc(table[item as keyof Table] as AnyColumn),
  );
}
