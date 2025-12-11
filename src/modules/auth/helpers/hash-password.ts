import { hex } from '@better-auth/utils/hex';
import { getRandomValues } from 'node:crypto';

import { generateKey } from '@/modules/auth/helpers/generate-key';

export async function hashPassword(password: string) {
  const salt = hex.encode(getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);

  return `${salt}:${hex.encode(key)}`;
}
