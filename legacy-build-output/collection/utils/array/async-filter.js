export async function asyncFilter(array, predicate) {
  const results = await Promise.all(array.map(predicate));
  return array.filter((_value, index) => results[index]);
}
