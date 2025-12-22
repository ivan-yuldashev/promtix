import type { InsertUser, SelectUser } from '@/modules/users/tables/users.table';

import { usersRepository } from '@/modules/users/repositories/users.repository';
import { BaseService } from '@/shared/core/base.service';

export const usersService = new BaseService<SelectUser, InsertUser>(usersRepository);
