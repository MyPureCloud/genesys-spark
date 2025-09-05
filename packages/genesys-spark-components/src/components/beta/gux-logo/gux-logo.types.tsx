export const guxLogoType = ['duotone', 'monotone'] as const;

export const guxLogoLayout = [
  'default',
  'tagline-horizontal',
  'tagline-stacked'
] as const;

export type GuxLogoType = (typeof guxLogoType)[number];

export type GuxLogoLayout = (typeof guxLogoLayout)[number];
