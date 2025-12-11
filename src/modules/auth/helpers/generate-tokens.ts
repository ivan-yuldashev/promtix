import { SignJWT } from 'jose';

import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';
import { durationToMs } from '@/modules/auth/utils/duration-to-ms';

export async function generateTokens(userId: string) {
  const jti = crypto.randomUUID();
  const now = Date.now();
  const refreshExpiresAtMs = now + durationToMs(SECURITY_CONFIG.jwt.refreshTtl);

  const [accessToken, refreshToken] = await Promise.all([
    new SignJWT({ sub: userId })
      .setProtectedHeader({ alg: SECURITY_CONFIG.jwt.alg })
      .setIssuedAt()
      .setExpirationTime(SECURITY_CONFIG.jwt.accessTtl)
      .setJti(crypto.randomUUID())
      .sign(SECURITY_CONFIG.jwt.accessSecret),

    new SignJWT({ jti, sub: userId })
      .setProtectedHeader({ alg: SECURITY_CONFIG.jwt.alg })
      .setIssuedAt()
      .setExpirationTime(SECURITY_CONFIG.jwt.refreshTtl)
      .sign(SECURITY_CONFIG.jwt.refreshSecret),
  ]);

  return {
    accessToken,
    jti,
    refreshExpiresAt: new Date(refreshExpiresAtMs),
    refreshToken,
  };
}
