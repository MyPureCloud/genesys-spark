import { guxLogoLayout, guxLogoType } from '../gux-logo.types';

export const defaultConfig = {
  description: `should render component as expected`,
  html: `<gux-logo-beta></gux-logo-beta>`
};

const variantConfigs = guxLogoType.flatMap(type => {
  return guxLogoLayout.map(layout => ({
    description: `should render component as expected when type "${type}" and layout "${layout}"`,
    html: `<gux-logo-beta type="${type}" layout="${layout}"></gux-logo-beta>`
  }));
});

const invalidVariantConfig = {
  description: 'should render component as expected when variant is invalid',
  html: '<gux-logo-beta type="invalid" layout="invalid"></gux-logo-beta>'
};

export const renderConfigs = [
  defaultConfig,
  ...variantConfigs,
  invalidVariantConfig
];
