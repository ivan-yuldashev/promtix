import { createRouter } from '@/infrastructure/http/create-router';
import * as handlers from '@/modules/tasks/tasks.handlers';
import * as routes from '@/modules/tasks/tasks.routes';

export const tasksRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);
