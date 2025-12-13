import { Buffer } from 'node:buffer';

import { env } from '@/infrastructure/config/env';

export const SECURITY_CONFIG = {
  jwt: {
    accessSecret: Buffer.from(env.ACCESS_TOKEN_SECRET),
    accessTtl: env.ACCESS_TOKEN_TTL,
    alg: 'HS256',
    refreshSecret: Buffer.from(env.REFRESH_TOKEN_SECRET),
    refreshTtl: env.REFRESH_TOKEN_TTL,
  },
  scrypt: {
    dkLen: 64,
    n: 16384,
    p: 1,
    r: 16,
  },
};
