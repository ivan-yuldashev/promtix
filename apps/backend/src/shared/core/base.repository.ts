import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

import type {
  CountParams,
  CreateParams,
  DeleteByIdParams,
  DeleteByParams,
  FindByIdParams,
  FindByParams,
  Repository,
  UpdateByIdParams,
  UpdateByParams,
} from '@/shared/types/repository.types';
import type { BaseEntity, BaseEntityKeys } from '@/shared/types/utils.types';

import { count, eq } from 'drizzle-orm';

import { getExecutor } from '@/infrastructure/db/context';
import { sortToSql } from '@/shared/helpers/sort-to-sql';

export class BaseRepository<
  Table extends PgTable & Record<BaseEntityKeys, PgColumn>,
  Select extends BaseEntity = InferSelectModel<Table> & BaseEntity,
  Insert extends object = InferInsertModel<Table>,
> implements Repository<Select, Insert> {
  constructor(protected readonly table: Table) {}

  async count({ where }: CountParams) {
    const executor = getExecutor();

    const [countResult] = await executor
      .select({ value: count() })
      .from(this.table as PgTable)
      .where(where);

    return countResult?.value ?? 0;
  }

  async create({ data }: CreateParams<Insert>) {
    const executor = getExecutor();

    const [insertedItem] = await executor
      .insert(this.table as PgTable)
      .values(data)
      .returning();

    return insertedItem as Select | undefined;
  }

  async deleteBy({ where }: DeleteByParams) {
    const executor = getExecutor();

    const deletedItems = await executor
      .delete(this.table as PgTable)
      .where(where)
      .returning();

    return deletedItems as Select[];
  }

  async deleteById({ id }: DeleteByIdParams<Select>) {
    const executor = getExecutor();

    const [deletedItem] = await executor
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();

    return deletedItem as Select | undefined;
  }

  async findBy({ limit, offset, sort, where }: FindByParams<Select>) {
    const executor = getExecutor();

    const results = await executor
      .select()
      .from(this.table as PgTable)
      .where(where)
      .orderBy(...sortToSql<Select, Table>(sort ?? ['createdAt'], this.table))
      .limit(limit)
      .offset(offset);

    return results as Select[];
  }

  async findById({ id }: FindByIdParams<Select>) {
    const executor = getExecutor();

    const [item] = await executor
      .select()
      .from(this.table as PgTable)
      .where(eq(this.table.id, id));

    return item as Select | undefined;
  }

  async updateBy({
    data,
    where,
  }: UpdateByParams<Partial<Insert>>) {
    const executor = getExecutor();

    const updatedItems = await executor
      .update(this.table)
      .set(data)
      .where(where)
      .returning();

    return updatedItems as Select[];
  }

  async updateById({
    data,
    id,
  }: UpdateByIdParams<Select, Partial<Insert>>) {
    const executor = getExecutor();

    const [updatedItem] = await executor
      .update(this.table as PgTable)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();

    return updatedItem as Select | undefined;
  }
}
