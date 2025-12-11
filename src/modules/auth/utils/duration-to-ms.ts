import { DurationUnit } from '@/shared/constants/duration-unit';

export function durationToMs(duration: `${number}${DurationUnit}`): number {
  const value = Number.parseInt(duration.slice(0, -1), 10);
  const unit = duration.at(-1) as DurationUnit;

  const multipliers: Record<DurationUnit, number> = {
    [DurationUnit.DAYS]: 24 * 60 * 60 * 1000,
    [DurationUnit.HOURS]: 60 * 60 * 1000,
    [DurationUnit.MINUTES]: 60 * 1000,
    [DurationUnit.SECONDS]: 1000,
  };

  return value * multipliers[unit];
}
