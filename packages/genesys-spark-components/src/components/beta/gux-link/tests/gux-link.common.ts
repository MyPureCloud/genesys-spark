export const renderConfigs = [
  {
    description: 'should render as expected default',
    html: `<gux-link-beta><a href="#">Link</a></gux-link-beta>`
  },
  {
    description: 'should render as expected at size small',
    html: `<gux-link-beta size="small"><a href="#">Link</a></gux-link-beta>`
  },
  {
    description: 'should render as expected standalone',
    html: `<gux-link-beta standalone><a href="#">Link</a></gux-link-beta>`
  },
  {
    description: 'should render as expected standalone with size small',
    html: `<gux-link-beta size="small" standalone><a href="#">Link</a></gux-link-beta>`
  },
  {
    description: 'should render as expected standalone with icon',
    html: `<gux-link-beta standalone><a href="#">Link<gux-icon icon-name="external-link" decorative></a></gux-icon></gux-link-beta>`
  }
];
