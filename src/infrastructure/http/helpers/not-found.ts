import type { Context } from 'hono';

import { problem } from '@/shared/problem/problem';

export function notFound(c: Context) {
  return problem.notFound(c);
}
