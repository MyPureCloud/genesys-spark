export const renderConfigs = [
  {
    description: 'Should render basic tag',
    html: '<gux-tag><span slot="content">Basic Tag</span></gux-tag>'
  },
  {
    description: 'Should render small size tag',
    html: '<gux-tag size="small"><span slot="content">Small Tag</span></gux-tag>'
  },
  {
    description: 'Should render large size tag',
    html: '<gux-tag size="large"><span slot="content">Large Tag</span></gux-tag>'
  },
  {
    description: 'Should render disabled tag',
    html: '<gux-tag disabled><span slot="content">Disabled Tag</span></gux-tag>'
  },
  {
    description: 'Should render removable tag',
    html: '<gux-tag removable><span slot="content">Removable Tag</span></gux-tag>'
  },
  {
    description: 'Should render disabled removable tag',
    html: '<gux-tag removable disabled><span slot="content">Disabled Removable Tag</span></gux-tag>'
  },
  {
    description: 'Should render bold emphasis tag',
    html: '<gux-tag emphasis="bold"><span slot="content">Bold Tag</span></gux-tag>'
  },
  {
    description: 'Should render subtle emphasis tag',
    html: '<gux-tag emphasis="subtle"><span slot="content">Subtle Tag</span></gux-tag>'
  },
  ...[
    'default',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'inherit'
  ].map(accent => ({
    description: `Should render ${accent} accent tag`,
    html: `<gux-tag accent="${accent}"><span slot="content">${accent} Accent</span></gux-tag>`
  })),
  {
    description: 'Should render large removable tag with accent',
    html: '<gux-tag size="large" removable accent="3"><span slot="content">Large Removable Tag</span></gux-tag>'
  },
  {
    description: 'Should render subtle emphasis removable tag',
    html: '<gux-tag emphasis="subtle" removable accent="5"><span slot="content">Subtle Removable Tag</span></gux-tag>'
  },
  {
    description: 'Should render tag with long text',
    html: '<gux-tag><span slot="content">This is a very long tag text that might wrap or truncate</span></gux-tag>'
  }
];
