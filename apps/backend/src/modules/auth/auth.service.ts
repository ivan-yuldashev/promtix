import type { RefreshToken } from '@/modules/refresh-tokens/refresh-token';
import type { User } from '@/modules/users/user';
import type { Repository } from '@/shared/types/repository';

import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { refreshTokens, users } from '@/infrastructure/db/schema';
import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';
import { generateTokens } from '@/modules/auth/helpers/generate-tokens';
import { getDummyHash } from '@/modules/auth/helpers/get-dummy-hash';
import { hashPassword } from '@/modules/auth/helpers/hash-password';
import { verifyPassword } from '@/modules/auth/helpers/verify-password';
import { verifyToken } from '@/modules/auth/helpers/verify-token';
import { isNil } from '@/shared/utils/is-nil';

const refreshTokenSchema = z.object({
  jti: z.string(),
  sub: z.uuid(),
});

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly tokenRepository: Repository<RefreshToken>,
  ) {}

  public async login({ email, password }: LoginData) {
    const [user] = await this.userRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(users.email, email),
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
    const data = await verifyToken(rawRefreshToken, SECURITY_CONFIG.jwt.refreshSecret, refreshTokenSchema);

    if (isNil(data)) {
      return;
    }

    await this.tokenRepository.updateBy({
      data: { revoked: true },
      where: eq(refreshTokens.jti, data.jti),
    });
  }

  public async refresh(rawRefreshToken: string) {
    const data = await verifyToken(rawRefreshToken, SECURITY_CONFIG.jwt.refreshSecret, refreshTokenSchema);

    if (isNil(data)) {
      return null;
    }

    const { jti, sub: userId } = data;

    const [storedToken] = await this.tokenRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(refreshTokens.jti, jti),
    });

    if (isNil(storedToken)) {
      return null;
    }

    if (storedToken.revoked) {
      await this.tokenRepository.updateBy({
        data: { revoked: true },
        where: eq(refreshTokens.userId, userId),
      });

      return null;
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      return null;
    }

    // TODO: Use transaction

    await this.tokenRepository.updateBy({
      data: { revoked: true },
      where: eq(refreshTokens.jti, jti),
    });

    const { accessToken, jti: newJti, refreshExpiresAt, refreshToken } = await generateTokens(userId);

    await this.tokenRepository.create({
      data: {
        expiresAt: refreshExpiresAt,
        jti: newJti,
        revoked: false,
        userId,
      },
    });

    return { accessToken, refreshExpiresAt, refreshToken };
  }

  public async register({ email, password }: RegisterData) {
    const [existingUser] = await this.userRepository.findBy({
      limit: 1,
      offset: 0,
      where: eq(users.email, email),
    });

    if (existingUser) {
      return null;
    }

    const hash = await hashPassword(password);

    const user = await this.userRepository.create({
      data: { email, hash },
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

    await this.tokenRepository.create({
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
