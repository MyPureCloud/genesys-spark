export function parsePxValue(value: string): number {
  if (!value.endsWith('px')) {
    return 0;
  }

  return parseFloat(value);
}
