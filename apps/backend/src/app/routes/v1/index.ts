import { createRouter } from '@/infrastructure/http/create-router';
import { authRouter } from '@/modules/auth/auth.index';
import { authMiddleware } from '@/modules/auth/auth.middleware';
import { tasksRouter } from '@/modules/tasks/tasks.index';

export function createV1Router() {
  const router = createRouter();

  router.route('/', authRouter);

  const authed = createRouter();
  authed.use(authMiddleware);
  authed.route('/', tasksRouter);

  router.route('/', authed);

  return router;
}
