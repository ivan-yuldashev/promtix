import { db } from '@/infrastructure/db/db';

export async function onHealthCheck() {
  await db.execute('SELECT 1');
}
