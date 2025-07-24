export const renderConfigs = [
  {
    description: 'Should render basic side panel',
    html: `<gux-side-panel-beta>
      <gux-side-panel-heading slot="heading">Panel Title</gux-side-panel-heading>
      <div slot="content">Panel content goes here</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render small size side panel',
    html: `<gux-side-panel-beta size="small">
      <gux-side-panel-heading slot="heading">Small Panel</gux-side-panel-heading>
      <div slot="content">Small panel content</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render medium size side panel',
    html: `<gux-side-panel-beta size="medium">
      <gux-side-panel-heading slot="heading">Medium Panel</gux-side-panel-heading>
      <div slot="content">Medium panel content</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render large size side panel',
    html: `<gux-side-panel-beta size="large">
      <gux-side-panel-heading slot="heading">Large Panel</gux-side-panel-heading>
      <div slot="content">Large panel content</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render with description',
    html: `<gux-side-panel-beta>
      <gux-side-panel-heading slot="heading">Panel with Description</gux-side-panel-heading>
      <div slot="description">This is a description of the panel content</div>
      <div slot="content">Panel content goes here</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render with footer',
    html: `<gux-side-panel-beta>
      <gux-side-panel-heading slot="heading">Panel with Footer</gux-side-panel-heading>
      <div slot="content">Panel content goes here</div>
      <div slot="footer">
        <gux-button accent="primary">Save</gux-button>
        <gux-button accent="secondary">Cancel</gux-button>
      </div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render with heading icon',
    html: `<gux-side-panel-beta>
      <gux-side-panel-heading slot="heading" icon-name="settings">Settings Panel</gux-side-panel-heading>
      <div slot="content">Settings content goes here</div>
    </gux-side-panel-beta>`
  },
  {
    description: 'Should render with all slots',
    html: `<gux-side-panel-beta size="medium">
      <gux-side-panel-heading slot="heading" icon-name="info" level="2">Complete Panel</gux-side-panel-heading>
      <div slot="description">This panel demonstrates all available slots and features</div>
      <div slot="content">
        <p>Main content area with multiple elements</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div slot="footer">
        <gux-button accent="primary">Apply</gux-button>
        <gux-button accent="secondary">Reset</gux-button>
      </div>
    </gux-side-panel-beta>`
  }
];
