import { serveEmojiFavicon } from 'stoker/middlewares';

import { configureOpenAPI } from '@/app/helpers/configure-open-api';
import { createV1Router } from '@/app/routes/v1';
import { createBaseApp } from '@/infrastructure/http/create-base-app';
import { ApiRootPath } from '@/shared/constants/paths';

export function createApp() {
  const app = createBaseApp();

  configureOpenAPI(app);
  app.use(serveEmojiFavicon('📝'));

  const v1Router = createV1Router();
  app.route(ApiRootPath.V1, v1Router);

  return app;
}
