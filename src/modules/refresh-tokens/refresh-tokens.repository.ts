import { refreshTokens } from '@/infrastructure/db/schema';
import { BaseRepository } from '@/shared/core/base.repository';

export const refreshTokenRepository = new BaseRepository(refreshTokens);
