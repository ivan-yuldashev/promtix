import { defineConfig } from 'drizzle-kit';

// eslint-disable-next-line no-restricted-imports
import { databaseUri } from './src/infrastructure/config/env';

export default defineConfig({
  dbCredentials: {
    url: databaseUri,
  },
  dialect: 'postgresql',
  out: './src/infrastructure/db/migrations',
  schema: './src/infrastructure/db/schema.ts',
});
