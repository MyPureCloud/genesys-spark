export const renderConfigs = [
  ...['primary', 'secondary', 'ghost'].map(accent => ({
    description: `Should render as expected for "${accent}" accent`,
    html: `<gux-table-toolbar-custom-action accent="${accent}"><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>`
  })),
  {
    description: 'should render a toolbar-custom-action',
    html: '<gux-table-toolbar-custom-action><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
  },
  {
    description: 'should render disabled toolbar-custom-action',
    html: '<gux-table-toolbar-custom-action disabled ><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
  },
  {
    description: 'should render icon-only toolbar-custom-action',
    html: '<gux-table-toolbar-custom-action icon-only ><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
  }
];
