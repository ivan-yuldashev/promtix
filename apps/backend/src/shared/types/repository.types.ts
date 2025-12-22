import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pagination.type';
import type { BaseEntity, IdType } from '@/shared/types/utils.types';

export type StrictShape<Actual, Expected> = Exclude<keyof Actual, keyof Expected> extends never ? Actual : never;

export type Sort<Fields extends string> = (`-${Fields}` | Fields)[];

export interface FindByParams<D> extends Pagination {
  orderBy?: SQL;
  sort?: Sort<Extract<keyof D, string>>;
  where?: SQL;
}

export interface CountParams {
  where?: SQL;
}

export interface FindByIdParams<D> {
  id: IdType<D>;
}

export interface DeleteByIdParams<D> {
  id: IdType<D>;
}

export interface DeleteByParams {
  where: SQL;
}

export interface CreateParams<D> {
  data: D;
}

export interface UpdateByParams<D> {
  data: D;
  where: SQL;
}

export interface UpdateByIdParams<S, I> {
  data: I;
  id: IdType<S>;
}

export interface Repository<Select extends BaseEntity, Insert> {
  count: (params: CountParams) => Promise<number>;
  create: <D extends Insert>(
    params: CreateParams<StrictShape<D, Insert>>,
  ) => Promise<Select | undefined>;
  deleteBy: (params: DeleteByParams) => Promise<Select[]>;
  deleteById: (params: DeleteByIdParams<Select>) => Promise<Select | undefined>;
  findBy: (params: FindByParams<Select>) => Promise<Select[]>;
  findById: (params: FindByIdParams<Select>) => Promise<Select | undefined>;
  updateBy: <D extends Insert>(
    params: UpdateByParams<Partial<StrictShape<D, Insert>>>,
  ) => Promise<Select[]>;
  updateById: <D extends Insert>(
    params: UpdateByIdParams<Select, Partial<StrictShape<D, Insert>>>,
  ) => Promise<Select | undefined>;
}
