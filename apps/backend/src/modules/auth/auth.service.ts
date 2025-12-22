import type { z } from 'zod';

import type { loginRequestSchema, registerRequestSchema } from '@/modules/auth/schemas/auth.schema';
import type { Repository } from '@/shared/types/repository.types';

import { eq } from 'drizzle-orm';

import { type InsertUser, type RefreshToken, type RefreshTokenInsert, refreshTokensTable, type SelectUser, usersTable } from '@/infrastructure/db/schema';
import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';
import { generateTokens } from '@/modules/auth/helpers/generate-tokens';
import { getDummyHash } from '@/modules/auth/helpers/get-dummy-hash';
import { hashPassword } from '@/modules/auth/helpers/hash-password';
import { verifyPassword } from '@/modules/auth/helpers/verify-password';
import { verifyToken } from '@/modules/auth/helpers/verify-token';
import { refreshTokenRepository } from '@/modules/auth/repositories/refresh-tokens.repository';
import { refreshTokenPayloadSchema } from '@/modules/auth/schemas/refresh-tokens.schema';
import { usersRepository } from '@/modules/users/repositories/users.repository';
import { transaction } from '@/shared/helpers/transaction-manager';
import { isNil } from '@/shared/utils/is-nil';

type LoginData = z.infer<typeof loginRequestSchema>;
type RegisterData = z.infer<typeof registerRequestSchema>;

export class AuthService {
  constructor(
    private readonly usersRepository: Repository<SelectUser, InsertUser>,
    private readonly tokensRepository: Repository<RefreshToken, RefreshTokenInsert>,
  ) {}

  public async login({ email, password }: LoginData) {
    const [user] = await this.usersRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(usersTable.email, email),
    });

    const hashToCheck = user ? user.hash : await getDummyHash();
    const isPasswordValid = await verifyPassword(hashToCheck, password);

    if (isNil(user) || !isPasswordValid) {
      return null;
    }

    const data = await this.createSession(user.id);
    const { hash: _hash, ...userWithoutHash } = user;

    return { ...data, user: userWithoutHash };
  }

  public async logout(rawRefreshToken: string): Promise<void> {
    const data = await verifyToken(rawRefreshToken, SECURITY_CONFIG.jwt.refreshSecret, refreshTokenPayloadSchema);

    if (isNil(data)) {
      return;
    }

    await this.tokensRepository.updateBy({
      data: { revoked: true },
      where: eq(refreshTokensTable.jti, data.jti),
    });
  }

  public async refresh(rawRefreshToken: string) {
    const data = await verifyToken(rawRefreshToken, SECURITY_CONFIG.jwt.refreshSecret, refreshTokenPayloadSchema);

    if (isNil(data)) {
      return null;
    }

    const { jti, sub: userId } = data;

    const [storedToken] = await this.tokensRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(refreshTokensTable.jti, jti),
    });

    if (isNil(storedToken)) {
      return null;
    }

    if (storedToken.revoked) {
      await this.tokensRepository.updateBy({
        data: { revoked: true },
        where: eq(refreshTokensTable.userId, userId),
      });

      return null;
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      return null;
    }

    return await transaction(async () => {
      await this.tokensRepository.updateBy({
        data: { revoked: true },
        where: eq(refreshTokensTable.jti, jti),
      });

      const { accessToken, jti: newJti, refreshExpiresAt, refreshToken } = await generateTokens(userId);

      await this.tokensRepository.create({
        data: {
          expiresAt: refreshExpiresAt,
          jti: newJti,
          revoked: false,
          userId,
        },
      });

      return { accessToken, refreshExpiresAt, refreshToken };
    });
  }

  public async register({ email, password, ...rest }: RegisterData) {
    const [existingUser] = await this.usersRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(usersTable.email, email),
    });

    if (existingUser) {
      return null;
    }

    const hash = await hashPassword(password);

    const user = await this.usersRepository.create({
      data: { email, hash, ...rest },
    });

    if (isNil(user)) {
      throw new Error('Failed to create user');
    }

    const data = await this.createSession(user.id);
    const { hash: _hash, ...userWithoutHash } = user;

    return { ...data, user: userWithoutHash };
  }

  private async createSession(userId: string) {
    const { accessToken, jti, refreshExpiresAt, refreshToken } = await generateTokens(userId);

    await this.tokensRepository.create({
      data: {
        expiresAt: refreshExpiresAt,
        jti,
        revoked: false,
        userId,
      },
    });

    return { accessToken, refreshExpiresAt, refreshToken };
  }
}

export const authService = new AuthService(usersRepository, refreshTokenRepository);
