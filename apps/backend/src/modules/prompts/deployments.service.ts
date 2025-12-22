import type { InsertDeployment, SelectDeployment } from '@/modules/prompts/tables/deployments.table';

import { deploymentsRepository } from '@/modules/prompts/repositories/deployments.repository';
import { BaseService } from '@/shared/core/base.service';

export const deploymentsService = new BaseService<SelectDeployment, InsertDeployment>(deploymentsRepository);
