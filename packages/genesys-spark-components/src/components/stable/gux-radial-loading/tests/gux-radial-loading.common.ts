export const renderConfigs = ['default', 'modal', 'input', 'full-page'].map(
  (context: string) => ({
    description: `should render as expected for "${context}" context`,
    html: `'<gux-radial-loading lang="en" context="${context}"></gux-radial-loading>`
  })
);
