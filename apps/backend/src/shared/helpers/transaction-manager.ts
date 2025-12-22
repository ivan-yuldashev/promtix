import { dbContext } from '@/infrastructure/db/context';
import { db } from '@/infrastructure/db/db';

export async function transaction<T>(callback: () => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    return dbContext.run(tx, callback);
  });
}
