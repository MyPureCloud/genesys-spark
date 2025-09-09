const accentRenderConfigs = [
  'info-on-dark',
  'info-on-light',
  'success',
  'warning',
  'error'
].map(accent => ({
  description: `should render as expected for "${accent}" accent`,
  html: `<gux-notification-badge accent="${accent}">9</gux-notification-badge>`
}));

const sizeRenderConfigs = ['small', 'medium', 'large'].flatMap(size => [
  {
    description: `should render as expected for "${size}" size with one digit`,
    html: `<gux-notification-badge size="${size}">9</gux-notification-badge>`
  },
  {
    description: `should render as expected for "${size}" size with two digits`,
    html: `<gux-notification-badge size="${size}">99</gux-notification-badge>`
  },
  {
    description: `should render as expected for "${size}" size with three digits`,
    html: `<gux-notification-badge size="${size}">99+</gux-notification-badge>`
  },
  {
    description: `should render as expected for "${size}" size with an icon`,
    html: `<gux-notification-badge size="${size}"><gux-icon icon-name="fa/diamond-regular" screenreader-text="Diamond notification badge example"></gux-icon></gux-notification-badge>`
  }
]);

export const renderConfigs = [...accentRenderConfigs, ...sizeRenderConfigs];
