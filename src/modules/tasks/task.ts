import type { z } from 'zod';

import type { taskSchema } from '@/modules/tasks/task.schemas';

export type Task = z.infer<typeof taskSchema>;
