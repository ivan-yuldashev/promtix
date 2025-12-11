import { createMiddleware } from 'hono/factory';

import type { AppBindings } from '@/app/types';

import { refreshTokens, tasks, users } from '@/infrastructure/db/schema';
import { createServices } from '@/infrastructure/services/helpers/create-services';
import { AuthService } from '@/modules/auth/auth.service';
import { BaseRepository } from '@/shared/core/base.repository';

const services = createServices([users, tasks] as const);
const auth = new AuthService(new BaseRepository(users), new BaseRepository(refreshTokens));

export const servicesMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  c.set('services', services);
  c.set('auth', auth);

  await next();
});
