import type { AppBindings } from '@/app/app.types';

import { createMiddleware } from 'hono/factory';

import { apiKeysService } from '@/modules/api-auth/api-keys.service';
import { authService } from '@/modules/auth/auth.service';
import { environmentsService } from '@/modules/environments/environments.service';
import { projectsService } from '@/modules/projects/projects.service';
import { deploymentsService } from '@/modules/prompts/deployments.service';
import { promptVersionsService } from '@/modules/prompts/prompt-versions.service';
import { promptsService } from '@/modules/prompts/prompts.service';
import { usersService } from '@/modules/users/users.service';
import { workspacesService } from '@/modules/workspaces/workspaces.service';

const services = {
  apiKeys: apiKeysService,
  auth: authService,
  deployments: deploymentsService,
  environments: environmentsService,
  projects: projectsService,
  prompts: promptsService,
  promptVersions: promptVersionsService,
  users: usersService,
  workspaces: workspacesService,
};

export const servicesMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  c.set('services', services);
  await next();
});
