const decorativeRenderConfig = {
  description: 'should render decorative icon',
  html: '<gux-icon icon-name="add" decorative></gux-icon>'
};

const screenreaderTextRenderConfig = {
  description: 'should render icon with screenreader text',
  html: '<gux-icon icon-name="add" screenreader-text="Add item"></gux-icon>'
};

const sizeRenderConfigs = ['small', 'medium', 'large', 'inherit'].map(size => ({
  description: `should render ${size} icon`,
  html: `<gux-icon icon-name="add" size="${size}" decorative></gux-icon>`
}));

export const renderConfigs = [
  decorativeRenderConfig,
  screenreaderTextRenderConfig,
  ...sizeRenderConfigs
];
