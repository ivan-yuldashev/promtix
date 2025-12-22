import type { Context } from 'hono';

import { setCookie as setBaseCookie } from 'hono/cookie';

import { env } from '@/infrastructure/config/env';
import { REFRESH_COOKIE_CONFIG } from '@/modules/auth/constants/refresh-cookie-config';

export function setCookie(c: Context, token: string, expires: Date) {
  return setBaseCookie(c, env.COOKIE_NAME, token, {
    ...REFRESH_COOKIE_CONFIG,
    expires,
  });
}
