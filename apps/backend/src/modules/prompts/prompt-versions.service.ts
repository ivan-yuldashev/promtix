import type { InsertPromptVersion, SelectPromptVersion } from '@/modules/prompts/tables/prompt-versions.table';

import { promptVersionsRepository } from '@/modules/prompts/repositories/prompt-versions.repository';
import { BaseService } from '@/shared/core/base.service';

export const promptVersionsService = new BaseService<SelectPromptVersion, InsertPromptVersion>(promptVersionsRepository);
