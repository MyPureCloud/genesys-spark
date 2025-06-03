export const renderConfigs = [
  'page-desktop',
  'page-mobile',
  'side-sheet-desktop'
].map((placement: string) => ({
  description: `should render as expected for "${placement}" placement`,
  html: `<gux-form-footer placement="${placement}">
    <footer>
      <gux-button accent="primary">Primary</gux-button>
      <gux-button accent="secondary">Secondary</gux-button>
    </footer>
    </gux-form-footer>`
}));
