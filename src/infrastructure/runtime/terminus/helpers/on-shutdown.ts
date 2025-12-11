import { pool } from '@/infrastructure/db/pool';
import { pino } from '@/infrastructure/logging/pino';

export async function onShutdown() {
  try {
    await pool.end();
    pino.info('DB pool closed successfully.');
  } catch (_error) {
    pino.error('Error closing the DB pool.');
  }

  pino.info('HTTP server closed.');
}
