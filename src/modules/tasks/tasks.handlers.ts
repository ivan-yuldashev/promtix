import type { AppRouteHandler } from '@/app/types';
import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from '@/modules/tasks/tasks.routes';

import { HttpStatusCodes } from '@/shared/constants/http-status-codes';
import { problem } from '@/shared/problem/problem';
import { isNil } from '@/shared/utils/is-nil';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { limit, offset } = c.req.valid('query');
  const { tasks } = c.get('services');

  const data = await tasks.find({ limit, offset });

  return c.json(data, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json');
  const { tasks } = c.get('services');

  const inserted = await tasks.create({ ...task });

  return c.json(inserted, HttpStatusCodes.CREATED);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const { tasks } = c.get('services');

  const task = await tasks.findById(id);

  if (isNil(task)) {
    return problem.notFound(c);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const data = c.req.valid('json');
  const { tasks } = c.get('services');

  const task = await tasks.updateById(id, data);

  if (isNil(task)) {
    return problem.notFound(c);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const { tasks } = c.get('services');

  const task = await tasks.deleteById(id);

  if (isNil(task)) {
    return problem.notFound(c);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
