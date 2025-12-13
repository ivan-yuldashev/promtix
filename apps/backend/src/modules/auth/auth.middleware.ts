import type { AppBindings } from '@/app/types';

import { createMiddleware } from 'hono/factory';
import { z } from 'zod';

import { SECURITY_CONFIG } from '@/modules/auth/constants/security-config';
import { extractJwt } from '@/modules/auth/helpers/extract-jwt';
import { verifyToken } from '@/modules/auth/helpers/verify-token';
import { problem } from '@/shared/problem/problem';
import { isNil } from '@/shared/utils/is-nil';

const tokenSchema = z.object({
  sub: z.uuid(),
});

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const authorizationHeader = c.req.header('Authorization');
  const jwt = extractJwt(authorizationHeader);

  if (isNil(jwt)) {
    return problem.unauthorized(c);
  }

  const tokenData = await verifyToken(jwt, SECURITY_CONFIG.jwt.accessSecret, tokenSchema);

  if (isNil(tokenData)) {
    return problem.unauthorized(c);
  }

  c.set('user', { id: tokenData.sub });

  await next();
});
