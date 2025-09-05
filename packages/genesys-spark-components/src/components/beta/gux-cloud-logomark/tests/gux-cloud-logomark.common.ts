import { guxCloudLogomarkVariant } from '../gux-cloud-logomark.types';

export const defaultConfig = {
  description: `should render component as expected`,
  html: `<gux-cloud-logomark-beta></gux-cloud-logomark-beta>`
};

const variantConfigs = guxCloudLogomarkVariant.map(variant => ({
  description: `should render component as expected when variant is ${variant}`,
  html: `<gux-cloud-logomark-beta variant="${variant}"></gux-cloud-logomark-beta>`
}));

const invalidVariantConfig = {
  description: 'should render component as expected when variant is invalid',
  html: '<gux-cloud-logomark-beta variant="invalid"></gux-cloud-logomark-beta>'
};

export const renderConfigs = [
  defaultConfig,
  ...variantConfigs,
  invalidVariantConfig
];
