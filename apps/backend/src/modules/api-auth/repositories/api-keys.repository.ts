import { apiKeysTable } from '@/modules/api-auth/tables/api-keys.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const apiKeysRepository = new BaseRepository(apiKeysTable);
