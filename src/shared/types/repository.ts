import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pegination';
import type { IdType, WithoutBaseFields } from '@/shared/types/utils';

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

export interface UpdateByIdParams<D> {
  data: D;
  id: IdType<D>;
}

export interface Repository<Data> {
  count: (params: CountParams) => Promise<number>;
  create: <D extends WithoutBaseFields<Data>>(
    params: CreateParams<StrictShape<D, WithoutBaseFields<Data>>>,
  ) => Promise<Data | undefined>;
  deleteBy: (params: DeleteByParams) => Promise<Data[]>;
  deleteById: (params: DeleteByIdParams<Data>) => Promise<Data | undefined>;
  findBy: (params: FindByParams<Data>) => Promise<Data[]>;
  findById: (params: FindByIdParams<Data>) => Promise<Data | undefined>;
  updateBy: <D extends Partial<WithoutBaseFields<Data>>>(
    params: UpdateByParams<StrictShape<D, WithoutBaseFields<Data>>>,
  ) => Promise<Data[]>;
  updateById: <D extends Partial<WithoutBaseFields<Data>>>(
    params: UpdateByIdParams<StrictShape<D, WithoutBaseFields<Data>>>,
  ) => Promise<Data | undefined>;
}
