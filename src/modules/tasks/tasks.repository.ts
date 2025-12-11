import { tasks } from '@/infrastructure/db/schema';
import { BaseRepository } from '@/shared/core/base.repository';

export const taskRepository = new BaseRepository(tasks);
