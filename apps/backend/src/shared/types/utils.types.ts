import type { z } from 'zod';

import type { baseSchema } from '@/shared/schemas/base.schema';

export type IdType<T> = T extends { id: infer Id } ? Id : never;

export type FullPartial<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export type BaseEntity = z.infer<typeof baseSchema>;

export type BaseEntityKeys = keyof BaseEntity;

export type WithoutBaseEntity<T> = Omit<T, BaseEntityKeys>;

export interface Page<T> {
  docs: T[];
  total: number;
}
