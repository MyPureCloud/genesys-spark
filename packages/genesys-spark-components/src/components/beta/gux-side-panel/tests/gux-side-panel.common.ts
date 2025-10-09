export const expandablePanel = `<gux-side-panel-beta size="medium" id="expandable-example">
  <gux-side-panel-header slot="header" expandable="true">
    <gux-side-panel-heading slot="title"
      >Expandable Side Panel</gux-side-panel-heading
    >
    <gux-icon
      slot="icon"
      decorative
      size="medium"
      icon-name="user-add"
      screenreader-text="add John Smith to contact list"
    ></gux-icon>
  </gux-side-panel-header>
  <div slot="content" id="expandable-content">
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames
    ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
    tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
    Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
  </div>
  <footer slot="footer" aria-label="Side panel footer">
    <gux-cta-group>
      <gux-button slot="primary" onclick="notify(event)">Primary</gux-button>
      <gux-button slot="secondary" onclick="notify(event)"
        >Secondary</gux-button
      >
      <gux-button
        slot="dismiss"
        onclick="document.getElementById('expandable-example').style.display = 'none'"
        >Dismiss</gux-button
      >
    </gux-cta-group>
  </footer>
</gux-side-panel-beta>`;

export const minimalPanel = `<gux-side-panel-beta>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
    </gux-side-panel-beta>`;

export const maximumPanel = `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
      <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
      <gux-icon
        slot="icon"
        decorative
        size="medium"
        icon-name="user-add"
        screenreader-text="Screenreader text"
      ></gux-icon>
      <div slot="description">This is a description</div>
      <gux-badge slot="badge">New</gux-badge>
    </gux-side-panel-header>
    <gux-tabs slot="tabs">
      <gux-tab-list slot="tab-list">
        <gux-tab tab-id="1-1">Tab Header 1</gux-tab>
        <gux-tab tab-id="1-2">Tab Header 2</gux-tab>
      </gux-tab-list>
      <gux-tab-panel tab-id="1-1">Tab content 1</gux-tab-panel>
      <gux-tab-panel tab-id="1-2">Tab content 2</gux-tab-panel>
    </gux-tabs>
          <div slot="content">Test content</div>
          <footer slot="footer" aria-label="Side panel footer">
      <gux-cta-group>
        <gux-button slot="primary">Primary</gux-button>
        <gux-button slot="secondary">Secondary</gux-button>
        <gux-button slot="dismiss">Dismiss</gux-button>
      </gux-cta-group>
    </footer>
        </gux-side-panel-beta>`;

export const renderConfigs = [
  {
    description: 'Should render basic side panel',
    html: minimalPanel
  },
  {
    description: 'Should render side panel with header',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with header and description',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
            <div slot="description">This is a description</div>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with header and icon',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
            <gux-icon slot="icon" decorative size="medium" icon-name="user-add"></gux-icon>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with header and badge',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
            <gux-badge slot="badge">New</gux-badge>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with header and tabs',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <gux-tabs slot="tabs">
            <gux-tab-list slot="tab-list">
              <gux-tab tab-id="1-1">Tab Header 1</gux-tab>
              <gux-tab tab-id="1-2">Tab Header 2</gux-tab>
            </gux-tab-list>
            <gux-tab-panel tab-id="1-1">Tab content 1</gux-tab-panel>
            <gux-tab-panel tab-id="1-2">Tab content 2</gux-tab-panel>
          </gux-tabs>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with header and footer',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
          <footer slot="footer" aria-label="Side panel footer">
            <gux-cta-group>
              <gux-button slot="primary">Primary</gux-button>
              <gux-button slot="secondary">Secondary</gux-button>
              <gux-button slot="dismiss">Dismiss</gux-button>
            </gux-cta-group>
          </footer>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel size small',
    html: `<gux-side-panel-beta size="small">
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel size medium',
    html: `<gux-side-panel-beta size="medium">
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel size large',
    html: `<gux-side-panel-beta size="large">
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render side panel with large heading',
    html: `<gux-side-panel-beta>
          <gux-side-panel-header slot="header">
            <gux-side-panel-heading slot="title" size="large">The Heading</gux-side-panel-heading>
          </gux-side-panel-header>
          <div slot="content">
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
    </div>
        </gux-side-panel-beta>`
  },
  {
    description: 'Should render expandable side panel',
    html: `<gux-side-panel-beta size="medium" id="expandable-example">
      <gux-side-panel-header slot="header" expandable="true">
        <gux-side-panel-heading slot="title"
          >Expandable Side Panel</gux-side-panel-heading
        >
        <gux-icon
          slot="icon"
          decorative
          size="medium"
          icon-name="user-add"
          screenreader-text="add John Smith to contact list"
        ></gux-icon>
      </gux-side-panel-header>
      <div slot="content" id="expandable-content">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames
        ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
        tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
        Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
      </div>
      <footer slot="footer" aria-label="Side panel footer">
        <gux-cta-group>
          <gux-button slot="primary" onclick="notify(event)">Primary</gux-button>
          <gux-button slot="secondary" onclick="notify(event)"
            >Secondary</gux-button
          >
          <gux-button
            slot="dismiss"
            onclick="document.getElementById('expandable-example').style.display = 'none'"
            >Dismiss</gux-button
          >
        </gux-cta-group>
      </footer>
    </gux-side-panel-beta>`
  }
];
