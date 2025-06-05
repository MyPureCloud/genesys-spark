export const renderConfigs = [
  {
    description: 'gux-label-info',
    html: `<gux-label-info-beta></gux-label-info-beta>`
  },
  {
    description: 'question variant for gux-label-info',
    html: `<gux-label-info-beta variant="question"><span slot="content">This is some tooltip text</span></gux-label-info-beta>`
  },
  {
    description: 'info variant for gux-label-info',
    html: `<gux-label-info-beta variant="info"></gux-label-info-beta>`
  },
  {
    description: 'tooltip text content for gux-label-info',
    html: `<gux-label-info-beta><span slot="content">This is some tooltip text</span></gux-label-info-beta>`
  },
  {
    description: 'tooltip embedded HTML content for gux-label-info',
    html: `<gux-label-info-beta><span slot="content">This is some <b>tooltip</b> text</span></gux-label-info-beta>`
  },
  {
    description: 'invalid variant for gux-label-info',
    html: `<gux-label-info-beta variant="invalid-variant"><span slot="content">This is an information tooltip</span></gux-label-info-beta>`
  }
];
