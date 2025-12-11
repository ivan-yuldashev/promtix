import type { InferSelectModel } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

import { count, eq } from 'drizzle-orm';

import type {
  CountParams,
  CreateParams,
  DeleteByIdParams,
  DeleteByParams,
  FindByIdParams,
  FindByParams,
  Repository,
  StrictShape,
  UpdateByIdParams,
  UpdateByParams,
} from '@/shared/types/repository';
import type { BaseFieldsName, WithoutBaseFields } from '@/shared/types/utils';

import { orm as db } from '@/infrastructure/db/orm';
import { sortToSql } from '@/shared/helpers/sort-to-sql';

export class BaseRepository<
  Table extends PgTable & Record<BaseFieldsName, PgColumn>,
  Data extends object = InferSelectModel<Table>,
> implements Repository<Data>
{
  protected readonly table: Table;

  constructor(table: Table) {
    this.table = table;
  }

  async count({ where }: CountParams) {
    const [countResult] = await db
      .select({ value: count() })
      .from(this.table as PgTable)
      .where(where);

    return countResult?.value ?? 0;
  }

  async create<D extends WithoutBaseFields<Data>>({ data }: CreateParams<StrictShape<D, WithoutBaseFields<Data>>>) {
    const [insertedItem] = await db
      .insert(this.table as PgTable)
      .values(data)
      .returning();

    return insertedItem as Data | undefined;
  }

  async deleteBy({ where }: DeleteByParams) {
    const deletedItems = await db
      .delete(this.table as PgTable)
      .where(where)
      .returning();

    return deletedItems as Data[];
  }

  async deleteById({ id }: DeleteByIdParams<Data>) {
    const [deletedItem] = await db
      .delete(this.table as PgTable)
      .where(eq(this.table.id, id))
      .returning();

    return deletedItem as Data | undefined;
  }

  async findBy({ limit, offset, sort, where }: FindByParams<Data>) {
    const results = await db
      .select()
      .from(this.table as PgTable)
      .where(where)
      .orderBy(...sortToSql<Data, Table>(sort ?? ['createdAt'], this.table))
      .limit(limit)
      .offset(offset);

    return results as Data[];
  }

  async findById({ id }: FindByIdParams<Data>) {
    const [item] = await db
      .select()
      .from(this.table as PgTable)
      .where(eq(this.table.id, id));

    return item as Data | undefined;
  }

  async updateBy<D extends Partial<WithoutBaseFields<Data>>>({
    data,
    where,
  }: UpdateByParams<StrictShape<D, WithoutBaseFields<Data>>>) {
    const updatedItems = await db
      .update(this.table as PgTable)
      .set(data)
      .where(where)
      .returning();

    return updatedItems as Data[];
  }

  async updateById<D extends Partial<WithoutBaseFields<Data>>>({
    data,
    id,
  }: UpdateByIdParams<StrictShape<D, WithoutBaseFields<Data>>>) {
    const [updatedItem] = await db
      .update(this.table as PgTable)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return updatedItem as Data | undefined;
  }
}
