import { Pool } from 'pg';

import { databaseUri } from '@/infrastructure/config/env';

export const pool = new Pool({
  connectionString: databaseUri,
  connectionTimeoutMillis: 5_000,
});
