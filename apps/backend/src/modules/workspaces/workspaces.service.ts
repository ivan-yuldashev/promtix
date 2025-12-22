import type { InsertWorkspace, SelectWorkspace } from '@/modules/workspaces/tables/workspaces.table';

import { workspacesRepository } from '@/modules/workspaces/repositories/workspaces.repository';
import { BaseService } from '@/shared/core/base.service';

export const workspacesService = new BaseService<SelectWorkspace, InsertWorkspace>(workspacesRepository);
