export const renderConfigs = [
  {
    description: 'should render tooltip with long text to truncate',
    html: '<div style="max-width: 40px"><gux-tooltip-title><span><slot aria-hidden="true" onSlotchange={this.onSlotChange.bind(this)}>Some long text to truncate and use a tooltip</slot></span></gux-tooltip-title></div>'
  },
  {
    description: 'should render tooltip with short text',
    html: '<gux-tooltip-title><div style="max-width: 200px">Some short text</div></gux-tooltip-title>'
  }
];
