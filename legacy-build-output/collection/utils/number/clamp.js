export default function clamp(input, lower = -Infinity, upper = Infinity) {
  if (isNaN(input)) {
    return NaN;
  }
  return Math.min(Math.max(input, lower), upper);
}
