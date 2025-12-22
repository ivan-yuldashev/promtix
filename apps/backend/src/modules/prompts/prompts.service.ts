import type { InsertPrompt, SelectPrompt } from '@/modules/prompts/tables/prompts.table';

import { promptRepository } from '@/modules/prompts/repositories/prompts.repository';
import { BaseService } from '@/shared/core/base.service';

export const promptsService = new BaseService<SelectPrompt, InsertPrompt>(promptRepository);
