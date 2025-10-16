export const renderConfigs = [
  'default',
  'modal',
  'input',
  'full-page',
  'around-icon',
  'around-icon-light'
].map((context: string) => ({
  description: `should render as expected for "${context}" context`,
  html: `'<gux-radial-loading lang="en" context="${context}" screenreader-text="Loading"></gux-radial-loading>`
}));
