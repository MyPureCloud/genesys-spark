export const renderConfigs = [
  ...['xsmall', 'small', 'medium', 'large'].map(size => ({
    description: `Should render as expected for "${size}" size`,
    html: `<gux-avatar-beta size="${size}" name="Conor Darcy"></gux-avatar-beta>`
  })),

  ...[
    'default',
    'auto',
    '0',
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
    '11',
    '12'
  ].map(accent => ({
    description: `Should render as expected for "${accent}" accent`,
    html: `<gux-avatar-beta accent="${accent}" name="Conor Darcy"></gux-avatar-beta>`
  })),

  ...[
    'available',
    'away',
    'break',
    'busy',
    'meal',
    'meeting',
    'idle',
    'on-queue',
    'offline',
    'out-of-office',
    'training',
    'none'
  ].map(presence => ({
    description: `Should render as expected for "${presence}" presence with badge`,
    html: `<gux-avatar-beta presence="${presence}" badge name="Conor Darcy"></gux-avatar-beta>`
  })),

  ...['available', 'away', 'busy', 'offline'].map(presence => ({
    description: `Should render as expected for "${presence}" presence with ring`,
    html: `<gux-avatar-beta presence="${presence}" ring name="Conor Darcy"></gux-avatar-beta>`
  })),

  ...['zoom', 'teams', '8x8', 'none'].map(ucIntegration => ({
    description: `Should render as expected for "${ucIntegration}" uc-integration`,
    html: `<gux-avatar-beta uc-integration="${ucIntegration}" name="Conor Darcy"></gux-avatar-beta>`
  })),

  {
    description: 'Should render as expected with notifications',
    html: '<gux-avatar-beta notifications name="Conor Darcy"></gux-avatar-beta>'
  },
  {
    description: 'Should render as expected with badge and ring combined',
    html: '<gux-avatar-beta badge ring presence="available" name="Conor Darcy"></gux-avatar-beta>'
  },
  {
    description: 'Should render as expected with tooltip disabled',
    html: '<gux-avatar-beta tooltip-enabled="false" name="Conor Darcy"></gux-avatar-beta>'
  },
  {
    description: 'Should render as expected with label',
    html: '<gux-avatar-beta label="Available" presence="available" badge name="Conor Darcy"></gux-avatar-beta>'
  },
  {
    description: 'Should render as expected with image slot',
    html: '<gux-avatar-beta name="Conor Darcy"><img slot="image" src="https://i.pravatar.cc/300?img=1" alt="Conor Darcy" /></gux-avatar-beta>'
  }
];
