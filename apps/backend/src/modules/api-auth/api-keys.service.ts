import type { InsertApiKey, SelectApiKey } from '@/modules/api-auth/tables/api-keys.table';

import { apiKeysRepository } from '@/modules/api-auth/repositories/api-keys.repository';
import { BaseService } from '@/shared/core/base.service';

export const apiKeysService = new BaseService<SelectApiKey, InsertApiKey>(apiKeysRepository);
