export const renderConfigs = [
  {
    description: 'Should render basic tag',
    html: '<gux-tag>Basic Tag</gux-tag>'
  },
  {
    description: 'Should render small size tag',
    html: '<gux-tag size="small">Small Tag</gux-tag>'
  },
  {
    description: 'Should render large size tag',
    html: '<gux-tag size="large">Large Tag</gux-tag>'
  },
  {
    description: 'Should render disabled tag',
    html: '<gux-tag disabled>Disabled Tag</gux-tag>'
  },
  {
    description: 'Should render removable tag',
    html: '<gux-tag removable>Removable Tag</gux-tag>'
  },
  {
    description: 'Should render disabled removable tag',
    html: '<gux-tag removable disabled>Disabled Removable Tag</gux-tag>'
  },
  {
    description: 'Should render bold emphasis tag',
    html: '<gux-tag emphasis="bold">Bold Tag</gux-tag>'
  },
  {
    description: 'Should render subtle emphasis tag',
    html: '<gux-tag emphasis="subtle">Subtle Tag</gux-tag>'
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
    html: `<gux-tag accent="${accent}">${accent} Accent</gux-tag>`
  })),
  {
    description: 'Should render large removable tag with accent',
    html: '<gux-tag size="large" removable accent="3">Large Removable Tag</gux-tag>'
  },
  {
    description: 'Should render subtle emphasis removable tag',
    html: '<gux-tag emphasis="subtle" removable accent="5">Subtle Removable Tag</gux-tag>'
  },
  {
    description: 'Should render tag with long text',
    html: '<gux-tag>This is a very long tag text that might wrap or truncate</gux-tag>'
  }
];
