import { workspacesTable } from '@/modules/workspaces/tables/workspaces.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const workspacesRepository = new BaseRepository(workspacesTable);
