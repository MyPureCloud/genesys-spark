export async function asyncFilter<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
): Promise<T[]> {
  const results = await Promise.all(array.map(predicate));

  return array.filter((_value, index) => results[index]);
}
