import type { Context } from 'hono';

import { setCookie as setBaseCookie } from 'hono/cookie';

import { env, isDevelopment } from '@/infrastructure/config/env';
import { V1Path } from '@/shared/constants/paths';

export function setCookie(c: Context, token: string, expires: Date) {
  return setBaseCookie(c, env.COOKIE_NAME, token, {
    expires,
    httpOnly: true,
    path: V1Path.REFRESH_TOKEN,
    sameSite: 'Strict',
    secure: !isDevelopment,
  });
}
