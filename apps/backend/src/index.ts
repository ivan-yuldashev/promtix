import { serve } from '@hono/node-server';

import { createApp } from '@/app/create-app';
import { env } from '@/infrastructure/config/env';
import { checkDatabaseConnection } from '@/infrastructure/db/check-database-connection';
import { pino } from '@/infrastructure/logging/pino';
import { setupTerminus } from '@/infrastructure/runtime/terminus/setup-terminus';

await checkDatabaseConnection();

const app = createApp();

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    pino.info({ port: info.port }, `Server is running on http://localhost:${info.port}`);
  },
);

setupTerminus(server);
