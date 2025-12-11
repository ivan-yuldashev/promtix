export function valueToKeyMap<T extends Readonly<Record<string, number | string>>>(
  object: T,
): {
  [P in keyof T as T[P]]: P;
} {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key])) as {
    [P in keyof T as T[P]]: P;
  };
}
