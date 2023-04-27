import clamp from '../../../utils/number/clamp';
export const RADIUS = 23.5;
export const STROKE_DASH = 2 * Math.PI * RADIUS;
export function canShowPercentageState(value, max) {
  return !(isNaN(value) || isNaN(max) || value > max || value < 0 || max === 0);
}
export function getPercentageString(value, max, scale) {
  const scaleFactor = Math.pow(10, clamp(scale, 0, 2));
  return `${Math.round(((value + Number.EPSILON) / max) * 100 * scaleFactor) /
    scaleFactor}%`;
}
