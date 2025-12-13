import { orm } from '@/infrastructure/db/orm';

export async function onHealthCheck() {
  await orm.execute('SELECT 1');
}
