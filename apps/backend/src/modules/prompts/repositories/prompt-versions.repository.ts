import { promptVersionsTable } from '@/modules/prompts/tables/prompt-versions.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const promptVersionsRepository = new BaseRepository(promptVersionsTable);
