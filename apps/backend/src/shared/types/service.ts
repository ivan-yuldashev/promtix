import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pegination';
import type { FullPartial, IdType, Page, WithoutBaseFields } from '@/shared/types/utils';

export interface Service<Data> {
  count: (params: { where?: SQL }) => Promise<number>;
  create: (data: WithoutBaseFields<Data>) => Promise<Data | undefined>;
  delete: (where: SQL) => Promise<Data[]>;
  deleteById: (id: IdType<Data>) => Promise<Data | undefined>;
  find: (
    params: Pagination & {
      orderBy?: SQL;
      where?: SQL;
    },
  ) => Promise<Page<Data>>;
  findById: (id: IdType<Data>) => Promise<Data | undefined>;
  update: (data: FullPartial<WithoutBaseFields<Data>>, where: SQL) => Promise<Data[]>;
  updateById: (id: IdType<Data>, data: FullPartial<WithoutBaseFields<Data>>) => Promise<Data | undefined>;
}
