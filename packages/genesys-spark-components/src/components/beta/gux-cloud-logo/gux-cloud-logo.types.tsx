export const guxCloudLogoType = ['duotone', 'monotone'] as const;

export const guxCloudLogoLayout = ['horizontal', 'stacked'] as const;

export type GuxCloudLogoType = (typeof guxCloudLogoType)[number];

export type GuxCloudLogoLayout = (typeof guxCloudLogoLayout)[number];
