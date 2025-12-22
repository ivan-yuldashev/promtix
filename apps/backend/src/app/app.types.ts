import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

import type { apiKeysService } from '@/modules/api-auth/api-keys.service';
import type { AuthService } from '@/modules/auth/auth.service';
import type { environmentsService } from '@/modules/environments/environments.service';
import type { projectsService } from '@/modules/projects/projects.service';
import type { deploymentsService } from '@/modules/prompts/deployments.service';
import type { promptVersionsService } from '@/modules/prompts/prompt-versions.service';
import type { promptsService } from '@/modules/prompts/prompts.service';
import type { usersService } from '@/modules/users/users.service';
import type { Role } from '@/modules/workspaces/constants/role';
import type { workspacesService } from '@/modules/workspaces/workspaces.service';

interface AppServices {
  apiKeys: typeof apiKeysService;
  auth: AuthService;
  deployments: typeof deploymentsService;
  environments: typeof environmentsService;
  projects: typeof projectsService;
  prompts: typeof promptsService;
  promptVersions: typeof promptVersionsService;
  users: typeof usersService;
  workspaces: typeof workspacesService;
}

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    services: AppServices;
    user: { id: string; role?: Role };
  };
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
