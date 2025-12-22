import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pagination.type';
import type { StrictShape } from '@/shared/types/repository.types';
import type { BaseEntity, IdType, Page } from '@/shared/types/utils.types';

export interface Service<Select extends BaseEntity, Insert> {
  count: (params: { where?: SQL }) => Promise<number>;
  create: <D extends Insert>(data: StrictShape<D, Insert>) => Promise<Select | undefined>;
  delete: (where: SQL) => Promise<Select[]>;
  deleteById: (id: IdType<Select>) => Promise<Select | undefined>;
  find: (
    params: Pagination & {
      orderBy?: SQL;
      where?: SQL;
    },
  ) => Promise<Page<Select>>;
  findById: (id: IdType<Select>) => Promise<Select | undefined>;
  update: <D extends Insert>(data: Partial<StrictShape<D, Insert>>, where: SQL) => Promise<Select[]>;
  updateById: <D extends Insert>(id: IdType<Select>, data: Partial<StrictShape<D, Insert>>) => Promise<Select | undefined>;
}
