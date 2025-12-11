import { serveEmojiFavicon } from 'stoker/middlewares';

import { configureOpenAPI } from '@/app/helpers/configure-open-api';
import { privateRoutes, publicRoutes } from '@/app/routes';
import { createBaseApp } from '@/infrastructure/http/create-base-app';
import { createRouter } from '@/infrastructure/http/create-router';
import { authMiddleware } from '@/modules/auth/auth.middleware';

export function createApp() {
  const app = createBaseApp();

  configureOpenAPI(app);

  app.use(serveEmojiFavicon('📝'));

  publicRoutes.forEach((route) => {
    app.route('/', route);
  });

  const authedApp = createRouter();
  authedApp.use(authMiddleware);

  privateRoutes.forEach((route) => {
    authedApp.route('/', route);
  });

  app.route('/', authedApp);

  return app;
}
