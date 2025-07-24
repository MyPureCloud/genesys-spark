export const renderConfigs = [
  {
    description: 'Should render basic segmented control',
    html: `<gux-segmented-control-beta>
      <gux-segmented-control-item value="option1">
        <span slot="text">Option 1</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option2">
        <span slot="text">Option 2</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option3">
        <span slot="text">Option 3</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render with selected value',
    html: `<gux-segmented-control-beta value="option2">
      <gux-segmented-control-item value="option1">
        <span slot="text">Option 1</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option2">
        <span slot="text">Option 2</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option3">
        <span slot="text">Option 3</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render disabled segmented control',
    html: `<gux-segmented-control-beta disabled>
      <gux-segmented-control-item value="option1">
        <span slot="text">Option 1</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option2">
        <span slot="text">Option 2</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option3">
        <span slot="text">Option 3</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render with icons',
    html: `<gux-segmented-control-beta>
      <gux-segmented-control-item value="home">
        <gux-icon slot="icon" icon-name="home" decorative></gux-icon>
        <span slot="text">Home</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="settings">
        <gux-icon slot="icon" icon-name="settings" decorative></gux-icon>
        <span slot="text">Settings</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="profile">
        <gux-icon slot="icon" icon-name="user" decorative></gux-icon>
        <span slot="text">Profile</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render icon-only items',
    html: `<gux-segmented-control-beta>
      <gux-segmented-control-item value="home" icon-only>
        <gux-icon slot="icon" icon-name="home" decorative></gux-icon>
        <span slot="text">Home</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render with individual disabled items',
    html: `<gux-segmented-control-beta>
      <gux-segmented-control-item value="option1">
        <span slot="text">Option 1</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option2" disabled>
        <span slot="text">Option 2</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="option3">
        <span slot="text">Option 3</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  },
  {
    description: 'Should render with two items',
    html: `<gux-segmented-control-beta value="left">
      <gux-segmented-control-item value="left">
        <span slot="text">Left</span>
      </gux-segmented-control-item>
      <gux-segmented-control-item value="right">
        <span slot="text">Right</span>
      </gux-segmented-control-item>
    </gux-segmented-control-beta>`
  }
];
