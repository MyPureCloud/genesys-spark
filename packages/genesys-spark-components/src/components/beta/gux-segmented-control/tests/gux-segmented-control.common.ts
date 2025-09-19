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
  },
  {
    description: 'Should render with thirty items',
    html: `<gux-segmented-control-beta value="one">
      <gux-segmented-control-item value="one"><span slot="text">Day One</span></gux-segmented-control-item>
      <gux-segmented-control-item value="two"><span slot="text">Day Two</span></gux-segmented-control-item>
      <gux-segmented-control-item value="three"><span slot="text">Day Three</span></gux-segmented-control-item>
      <gux-segmented-control-item value="four"><span slot="text">Day Four</span></gux-segmented-control-item>
      <gux-segmented-control-item value="five"><span slot="text">Day Five</span></gux-segmented-control-item>
      <gux-segmented-control-item value="six"><span slot="text">Day Six</span></gux-segmented-control-item>
      <gux-segmented-control-item value="seven"><span slot="text">Day Seven</span></gux-segmented-control-item>
      <gux-segmented-control-item value="eight"><span slot="text">Day Eight</span></gux-segmented-control-item>
      <gux-segmented-control-item value="nine"><span slot="text">Day Nine</span></gux-segmented-control-item>
      <gux-segmented-control-item value="ten"><span slot="text">Day Ten</span></gux-segmented-control-item>
      <gux-segmented-control-item value="eleven"><span slot="text">Day Eleven</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twelve"><span slot="text">Day Twelve</span></gux-segmented-control-item>
      <gux-segmented-control-item value="thirteen"><span slot="text">Day Thirteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="fourteen"><span slot="text">Day Fourteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="fifteen"><span slot="text">Day Fifteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="sixteen"><span slot="text">Day Sixteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="seventeen"><span slot="text">Day Seventeen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="eighteen"><span slot="text">Day Eighteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="nineteen"><span slot="text">Day Nineteen</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twenty"><span slot="text">Day Twenty</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentyone"><span slot="text">Day Twenty One</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentytwo"><span slot="text">Day Twenty Two</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentythree"><span slot="text">Day Twenty Three</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentyfour"><span slot="text">Day Twenty Four</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentyfive"><span slot="text">Day Twenty Five</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentysix"><span slot="text">Day Twenty Six</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentyseven"><span slot="text">Day Twenty Seven</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentyeight"><span slot="text">Day Twenty Eight</span></gux-segmented-control-item>
      <gux-segmented-control-item value="twentynine"><span slot="text">Day Twenty Nine</span></gux-segmented-control-item>
      <gux-segmented-control-item value="thirty"><span slot="text">Day Thirty</span></gux-segmented-control-item>
    </gux-segmented-control-beta>`
  }
];
