import { guxLogomarkVariant } from '../gux-logomark.types';

export const defaultConfig = {
  description: `should render component as expected`,
  html: `<gux-logomark-beta></gux-logomark-beta>`
};

const variantConfigs = guxLogomarkVariant.map(variant => ({
  description: `should render component as expected when variant is ${variant}`,
  html: `<gux-logomark-beta variant="${variant}"></gux-logomark-beta>`
}));

const invalidVariantConfig = {
  description: 'should render component as expected when variant is invalid',
  html: '<gux-logomark-beta variant="invalid"></gux-logomark-beta>'
};

export const renderConfigs = [
  defaultConfig,
  ...variantConfigs,
  invalidVariantConfig
];
