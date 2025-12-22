import { environmentsTable } from '@/modules/environments/tables/environments.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const environmentsRepository = new BaseRepository(environmentsTable);
