import { guxCloudLogoLayout, guxCloudLogoType } from '../gux-cloud-logo.types';

export const defaultConfig = {
  description: `should render component as expected`,
  html: `<gux-cloud-logo-beta></gux-cloud-logo-beta>`
};

const variantConfigs = guxCloudLogoType.flatMap(type => {
  return guxCloudLogoLayout.map(layout => ({
    description: `should render component as expected when type "${type}" and layout "${layout}"`,
    html: `<gux-cloud-logo-beta type="${type}" layout="${layout}"></gux-cloud-logo-beta>`
  }));
});

const invalidVariantConfig = {
  description: 'should render component as expected when variant is invalid',
  html: '<gux-cloud-logo-beta type="invalid" layout="invalid"></gux-cloud-logo-beta>'
};

export const renderConfigs = [
  defaultConfig,
  ...variantConfigs,
  invalidVariantConfig
];
