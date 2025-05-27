export const renderConfigs = [
  {
    description: 'should render gux-tab',
    html: `<gux-tab-list><gux-tab tab-id="1-1"><span id="tabTitle1">Tab Header 1</span></gux-tab></gux-tab-list>`
  },
  {
    description: 'should render a disabled tab',
    html: `<gux-tab-list><gux-tab gux-disabled tab-id="1-1"><span id="tabTitle1">Tab Header 1</span></gux-tab></gux-tab-list>`
  }
];
