import { workspaceMembersTable } from '@/modules/workspaces/tables/workspace-members.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const workspaceMembersRepository = new BaseRepository(workspaceMembersTable);
