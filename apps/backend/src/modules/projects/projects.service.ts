import type { InsertProject, SelectProject } from '@/modules/projects/tables/projects.table';

import { projectsRepository } from '@/modules/projects/repositories/projects.repository';
import { BaseService } from '@/shared/core/base.service';

export const projectsService = new BaseService<SelectProject, InsertProject>(projectsRepository);
