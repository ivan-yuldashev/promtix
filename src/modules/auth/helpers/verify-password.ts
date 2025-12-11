import { hexToBytes } from '@noble/hashes/utils.js';

import { generateKey } from '@/modules/auth/helpers/generate-key';
import { constantTimeEqual } from '@/modules/auth/utils/constant-time-equal';
import { isNil } from '@/shared/utils/is-nil';

export async function verifyPassword(hash: string, password: string) {
  const [salt, key] = hash.split(':');

  if (isNil(salt) || isNil(key)) {
    return false;
  }

  const targetKey = await generateKey(password, salt);

  return constantTimeEqual(targetKey, hexToBytes(key));
}
