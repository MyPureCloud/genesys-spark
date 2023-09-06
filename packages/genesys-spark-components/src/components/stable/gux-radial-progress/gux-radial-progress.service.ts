export const OVERALL_SIZE = 48; // Linked to --gse-ui-progressAndLoading-spinner-large

export const BORDER_SIZE = 4; // Linked to --gse-ui-progressAndLoading-largeBorder

export const RADIUS = OVERALL_SIZE * 0.5 - BORDER_SIZE * 0.5;

export const STROKE_DASH = 2 * Math.PI * RADIUS;

export function canShowPercentageState(value: number, max: number): boolean {
  return !(isNaN(value) || isNaN(max) || value > max || value < 0 || max === 0);
}

export function getPercentageString(value: number, max: number): string {
  return `${Math.round(((value + Number.EPSILON) / max) * 100)}%`;
}
