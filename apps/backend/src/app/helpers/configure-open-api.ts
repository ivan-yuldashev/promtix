import type { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/app/types';

import { Scalar } from '@scalar/hono-api-reference';

import { env } from '@/infrastructure/config/env';
import { ApiRootPath } from '@/shared/constants/paths';

// eslint-disable-next-line no-restricted-imports
import packageJSON from '../../../package.json' with { type: 'json' };

export function configureOpenAPI(app: OpenAPIHono<AppBindings>) {
  app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    bearerFormat: 'JWT',
    scheme: 'bearer',
    type: 'http',
  });

  app.openAPIRegistry.registerComponent('securitySchemes', 'cookieAuth', {
    in: 'cookie',
    name: env.COOKIE_NAME,
    type: 'apiKey',
  });

  app.doc(ApiRootPath.OPEN_API, {
    info: {
      title: 'Tasks API',
      version: packageJSON.version,
    },
    openapi: '3.0.0',
  });

  app.get(
    ApiRootPath.DOC,
    Scalar({
      authentication: {
        preferredSecurityScheme: 'bearerAuth',
      },
      defaultHttpClient: {
        clientKey: 'fetch',
        targetKey: 'js',
      },
      layout: 'classic',
      theme: 'default',
      url: ApiRootPath.OPEN_API,
    }),
  );
}
