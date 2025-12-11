import type { z } from 'zod';

import type { baseSchema } from '@/shared/schemas/base.schema';

export type IdType<T> = T extends { id: infer Id } ? Id : never;

export type FullPartial<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export type BaseFieldsName = keyof z.infer<typeof baseSchema>;

export type WithoutBaseFields<T> = Omit<T, BaseFieldsName>;

export interface Page<T> {
  docs: T[];
  total: number;
}
