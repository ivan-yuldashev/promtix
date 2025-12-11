import { orm } from '@/infrastructure/db/orm';
import { pino } from '@/infrastructure/logging/pino';

export async function checkDatabaseConnection() {
  try {
    await orm.execute('SELECT 1');
    pino.info('The database has been successfully connected.');
  } catch (error) {
    const errorMessage = 'Failed to connect to the database during startup check.';
    console.error(`🚫 ${errorMessage}`);

    if (error instanceof Error) {
      pino.fatal({ err: error }, errorMessage);
    } else {
      pino.fatal({ errorDetails: error }, errorMessage);
    }

    process.exit(1);
  }
}
