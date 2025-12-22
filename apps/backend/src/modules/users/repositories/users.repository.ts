import { usersTable } from '@/infrastructure/db/schema';
import { BaseRepository } from '@/shared/core/base.repository';

export const usersRepository = new BaseRepository(usersTable);
