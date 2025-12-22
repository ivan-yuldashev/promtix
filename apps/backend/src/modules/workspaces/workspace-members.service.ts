import type { InsertWorkspaceMember, SelectWorkspaceMember } from '@/modules/workspaces/tables/workspace-members.table';

import { workspaceMembersRepository } from '@/modules/workspaces/repositories/workspace-members.repository';
import { BaseService } from '@/shared/core/base.service';

export const workspaceMembersService = new BaseService<SelectWorkspaceMember, InsertWorkspaceMember>(workspaceMembersRepository);
