import { hashPassword } from '@/modules/auth/helpers/hash-password';
import { isNil } from '@/shared/utils/is-nil';

let dummyHashCache: null | string = null;

export async function getDummyHash(): Promise<string> {
  if (isNil(dummyHashCache)) {
    dummyHashCache = await hashPassword('dummy-password');
  }

  return dummyHashCache;
}
