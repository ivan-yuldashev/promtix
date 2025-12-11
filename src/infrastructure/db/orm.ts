import { drizzle } from 'drizzle-orm/node-postgres';

import { pool } from '@/infrastructure/db/pool';
import * as schema from '@/infrastructure/db/schema';

const orm = drizzle({ client: pool, schema });

export { orm };
