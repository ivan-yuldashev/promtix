import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

import type { AuthService } from '@/modules/auth/auth.service';
import type { Task } from '@/modules/tasks/task';
import type { User } from '@/modules/users/user';
import type { Service } from '@/shared/types/service';

interface AppServices {
  tasks: Service<Task>;
  users: Service<User>;
}

export interface AppBindings {
  Variables: {
    auth: AuthService;
    logger: PinoLogger;
    services: AppServices;
    user: { id: string };
  };
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
