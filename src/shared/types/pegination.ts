import type { z } from 'zod';

import type { paginationSchema } from '@/shared/schemas/pagination.schema';

export type Pagination = z.infer<typeof paginationSchema>;
