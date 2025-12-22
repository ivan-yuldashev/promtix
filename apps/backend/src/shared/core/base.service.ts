import type { SQL } from 'drizzle-orm';

import type { Pagination } from '@/shared/types/pagination.type';
import type { Repository } from '@/shared/types/repository.types';
import type { Service } from '@/shared/types/service.type';
import type { BaseEntity, FullPartial, IdType, Page } from '@/shared/types/utils.types';

import { omitUndefined } from '@/shared/utils/omit-undefined';

interface FindByParams extends Pagination {
  orderBy?: SQL;
  where?: SQL;
}

interface CountParams {
  where?: SQL;
}

export class BaseService<Select extends BaseEntity, Insert> implements Service<Select, Insert> {
  constructor(private readonly repository: Repository<Select, Insert>) {}

  async count(params: CountParams): Promise<number> {
    return this.repository.count(params);
  }

  async create(data: Insert): Promise<Select | undefined> {
    return this.repository.create({ data });
  }

  async delete(where: SQL): Promise<Select[]> {
    return this.repository.deleteBy({ where });
  }

  async deleteById(id: IdType<Select>): Promise<Select | undefined> {
    return this.repository.deleteById({ id });
  }

  async find(params: FindByParams): Promise<Page<Select>> {
    const { where } = params;

    const [docs, total] = await Promise.all([
      this.repository.findBy(params),
      this.repository.count(where ? { where } : {}),
    ]);

    return { docs, total };
  }

  async findById(id: IdType<Select>): Promise<Select | undefined> {
    return this.repository.findById({ id });
  }

  async update(raw: FullPartial<Insert>, where: SQL): Promise<Select[]> {
    const data = omitUndefined(raw);
    return this.repository.updateBy({ data, where });
  }

  async updateById(id: IdType<Select>, raw: FullPartial<Insert>): Promise<Select | undefined> {
    const data = omitUndefined(raw);
    return this.repository.updateById({ data, id });
  }
}
