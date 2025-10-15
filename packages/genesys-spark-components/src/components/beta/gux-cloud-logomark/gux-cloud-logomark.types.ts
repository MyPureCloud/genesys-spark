export const guxCloudLogomarkVariant = [
  'primary',
  'neutral',
  'on-background'
] as const;

export type GuxCloudLogomarkVariant = (typeof guxCloudLogomarkVariant)[number];
