import { promptsTable } from '@/modules/prompts/tables/prompts.table';
import { BaseRepository } from '@/shared/core/base.repository';

export const promptRepository = new BaseRepository(promptsTable);
