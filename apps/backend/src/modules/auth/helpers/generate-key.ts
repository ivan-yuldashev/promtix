import { scryptAsync } from '@noble/hashes/scrypt.js';

import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';

export async function generateKey(password: string, salt: string) {
  return scryptAsync(password.normalize('NFKC'), salt, {
    dkLen: SECURITY_CONFIG.scrypt.dkLen,
    maxmem: 256 * SECURITY_CONFIG.scrypt.n * SECURITY_CONFIG.scrypt.r,
    N: SECURITY_CONFIG.scrypt.n,
    p: SECURITY_CONFIG.scrypt.p,
    r: SECURITY_CONFIG.scrypt.r,
  });
}
