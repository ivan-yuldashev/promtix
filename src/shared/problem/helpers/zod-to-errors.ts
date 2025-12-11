import type { z } from 'zod';

import type { BodyLikeTarget, NonBodyTarget, PointerError, SourceError, TargetValue } from '@/shared/problem/types';

import { isBodyLikeTarget } from '@/shared/problem/helpers/is-body-like-target';

const escapePointerSeg = (s: string) => s.replace(/~/g, '~0').replace(/\//g, '~1');

function joinPointer(segs: Array<number | string>) {
  return segs.length ? `/${segs.map((p) => escapePointerSeg(String(p))).join('/')}` : '';
}

function getPointerErrors(zodError: z.ZodError<unknown>): PointerError[] {
  return zodError.issues.map((issue) => {
    const pointer = `/body${joinPointer((issue.path ?? []) as Array<number | string>)}`;

    return {
      code: issue.code,
      message: issue.message,
      source: { pointer },
    };
  });
}

function getSourceErrors(zodError: z.ZodError<unknown>, target: NonBodyTarget): SourceError[] {
  return zodError.issues.map((issue) => {
    const parameter = issue.path?.length ? issue.path.join('.') : 'unknown';

    return {
      code: issue.code,
      message: issue.message,
      source: { in: target, parameter },
    };
  });
}

export function zodToErrors(zodError: z.ZodError, target: BodyLikeTarget): PointerError[];
export function zodToErrors(zodError: z.ZodError, target: NonBodyTarget): SourceError[];

export function zodToErrors(zodError: z.ZodError, target: TargetValue): PointerError[] | SourceError[] {
  if (isBodyLikeTarget(target)) {
    return getPointerErrors(zodError);
  }

  return getSourceErrors(zodError, target);
}
