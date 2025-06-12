export const renderConfigs = [
  ...['12h', '24h'].map(clocktype => ({
    description: `Should render as expected for "${clocktype}" clock type`,
    html: `<gux-time-picker clock-type="${clocktype}"></gux-time-picker>`
  })),
  {
    description: 'Should render as expected for disabled',
    html: `<gux-time-picker disabled></gux-time-picker>`
  }
];
