export const renderConfigs = [
  ...['start', 'end'].map(alignment => ({
    description: `Should render as expected for "${alignment}" alignment`,
    html: `
      <gux-cta-group align="${alignment}">
        <gux-button slot="primary" onclick="notify(event)">Primary</gux-button>
        <gux-button slot="secondary" onclick="notify(event)">Secondary</gux-button>
        <gux-button slot="dismiss" onclick="notify(event)">Dismiss</gux-button>
      </gux-cta-group>
    `
  })),
  {
    description: 'Should render as expected for dangerous',
    html: `
      <gux-cta-group dangerous>
        <gux-button slot="primary" onclick="notify(event)">Primary</gux-button>
        <gux-button slot="secondary" onclick="notify(event)">Secondary</gux-button>
        <gux-button slot="dismiss" onclick="notify(event)">Dismiss</gux-button>
      </gux-cta-group>
    `
  }
];
