import { defineConfig } from 'drizzle-kit';

import { databaseUri } from '@/infrastructure/config/env';

export default defineConfig({
  dbCredentials: {
    url: databaseUri,
  },
  dialect: 'postgresql',
  out: './src/infrastructure/db/migrations',
  schema: './src/infrastructure/db/schema',
});
