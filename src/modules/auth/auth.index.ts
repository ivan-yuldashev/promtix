import { createRouter } from '@/infrastructure/http/create-router';
import * as handlers from '@/modules/auth/auth.handlers';
import * as routes from '@/modules/auth/auth.routes';

export const authRouter = createRouter()
  .openapi(routes.login, handlers.login)
  .openapi(routes.logout, handlers.logout)
  .openapi(routes.refresh, handlers.refresh)
  .openapi(routes.register, handlers.register);
