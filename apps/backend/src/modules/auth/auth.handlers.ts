import type { AppRouteHandler } from '@/app/types';
import type { LoginRoute, LogoutRoute, RefreshRoute, RegisterRoute } from '@/modules/auth/auth.routes';

import { deleteCookie, getCookie } from 'hono/cookie';

import { env } from '@/infrastructure/config/env';
import { setCookie } from '@/modules/auth/helpers/set-cookie';
import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { V1Path } from '@/shared/constants/paths';
import { problem } from '@/shared/problem/problem';
import { isNil } from '@/shared/utils/is-nil';

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid('json');
  const auth = c.get('auth');

  const data = await auth.login({ email, password });

  if (isNil(data)) {
    return problem.unauthorized(c, 'Login or password is incorrect');
  }

  const { refreshExpiresAt, refreshToken, ...rest } = data;
  setCookie(c, refreshToken, refreshExpiresAt);

  return c.json(rest, HttpStatusCodes.OK);
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  const auth = c.get('auth');

  const rawRefreshToken = getCookie(c, env.COOKIE_NAME);

  if (isNil(rawRefreshToken)) {
    return c.body(null, HttpStatusCodes.NO_CONTENT);
  }

  await auth.logout(rawRefreshToken);
  deleteCookie(c, env.COOKIE_NAME, { path: V1Path.REFRESH_TOKEN });

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

export const register: AppRouteHandler<RegisterRoute> = async (c) => {
  const { email, password } = c.req.valid('json');
  const auth = c.get('auth');

  const data = await auth.register({ email, password });

  if (isNil(data)) {
    return problem.conflict(c);
  }

  const { refreshExpiresAt, refreshToken, ...rest } = data;
  setCookie(c, refreshToken, refreshExpiresAt);

  return c.json(rest, HttpStatusCodes.CREATED);
};

export const refresh: AppRouteHandler<RefreshRoute> = async (c) => {
  const auth = c.get('auth');

  const rawRefreshToken = getCookie(c, env.COOKIE_NAME);

  if (isNil(rawRefreshToken)) {
    return problem.unauthorized(c);
  }

  const data = await auth.refresh(rawRefreshToken);

  if (isNil(data)) {
    return problem.unauthorized(c);
  }

  const { accessToken, refreshExpiresAt, refreshToken } = data;
  setCookie(c, refreshToken, refreshExpiresAt);

  return c.json({ accessToken }, HttpStatusCodes.OK);
};
