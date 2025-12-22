import { projectsTable } from '@/modules/projects/tables/projects.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const projectsRepository = new BaseRepository(projectsTable);
