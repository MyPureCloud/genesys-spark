export default function clamp(
  input: number,
  lower: number = -Infinity,
  upper: number = Infinity
): number {
  if (isNaN(input)) {
    return NaN;
  }

  return Math.min(Math.max(input, lower), upper);
}
