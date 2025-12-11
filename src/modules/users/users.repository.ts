import { users } from '@/infrastructure/db/schema';
import { BaseRepository } from '@/shared/core/base.repository';

export const userRepository = new BaseRepository(users);
