import type { InsertEnvironment, SelectEnvironment } from '@/modules/environments/tables/environments.table';

import { environmentsRepository } from '@/modules/environments/repositories/environments.repository';
import { BaseService } from '@/shared/core/base.service';

export const environmentsService = new BaseService<SelectEnvironment, InsertEnvironment>(environmentsRepository);
