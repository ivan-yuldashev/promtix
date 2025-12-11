import { z } from 'zod';

import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';
import { isNil } from '@/shared/utils/is-nil';

const authorizationHeaderSchema = z.templateLiteral(['Bearer ', z.jwt({ alg: SECURITY_CONFIG.jwt.alg })]);

export function extractJwt(header: string | undefined): null | string {
  if (isNil(header)) {
    return null;
  }

  const result = authorizationHeaderSchema.safeParse(header);

  if (!result.success) {
    return null;
  }

  return result.data.slice(7);
}
