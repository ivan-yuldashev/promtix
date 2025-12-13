import type { BodyLikeTarget, TargetValue } from '@/shared/problem/types';

import { Target } from '@/shared/problem/constants/target';

export function isBodyLikeTarget(target: TargetValue): target is BodyLikeTarget {
  return [Target.FORM, Target.JSON].includes(target as BodyLikeTarget);
}
