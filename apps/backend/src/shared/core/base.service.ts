import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pegination';
import type { Repository } from '@/shared/types/repository';
import type { Service } from '@/shared/types/service';
import type { FullPartial, IdType, Page, WithoutBaseFields } from '@/shared/types/utils';

import { omitUndefined } from '@/shared/utils/omit-undefined';

interface FindByParams extends Pagination {
  orderBy?: SQL;
  where?: SQL;
}

interface CountParams {
  where?: SQL;
}

export class BaseService<Data> implements Service<Data> {
  constructor(private readonly repository: Repository<Data>) {}

  async count(params: CountParams): Promise<number> {
    return this.repository.count(params);
  }

  async create(data: WithoutBaseFields<Data>): Promise<Data | undefined> {
    return this.repository.create({ data });
  }

  async delete(where: SQL): Promise<Data[]> {
    return this.repository.deleteBy({ where });
  }

  async deleteById(id: IdType<Data>): Promise<Data | undefined> {
    return this.repository.deleteById({ id });
  }

  async find(params: FindByParams): Promise<Page<Data>> {
    const { where } = params;

    const [docs, total] = await Promise.all([
      this.repository.findBy(params),
      this.repository.count(where ? { where } : {}),
    ]);

    return { docs, total };
  }

  async findById(id: IdType<Data>): Promise<Data | undefined> {
    return this.repository.findById({ id });
  }

  async update(raw: FullPartial<WithoutBaseFields<Data>>, where: SQL): Promise<Data[]> {
    const data = omitUndefined(raw);
    return this.repository.updateBy({ data, where });
  }

  async updateById(id: IdType<Data>, raw: FullPartial<WithoutBaseFields<Data>>): Promise<Data | undefined> {
    const data = omitUndefined(raw);
    return this.repository.updateById({ data, id });
  }
}
