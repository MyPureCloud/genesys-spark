const basicRenderConfig = [
  {
    description: 'should render a gux-blank-state component',
    html: `
      <gux-blank-state-beta>
        <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
        <div slot="primary-message">Sorry, something went wrong.</div>
        <div slot="additional-guidance">Please refresh this page to try again.</div>
        <button slot="call-to-action" type="button">Call to action</button>
      </gux-blank-state-beta>
    `
  }
];

const optionalSlotRenderConfigs = [
  {
    name: 'image',
    html: `<gux-illustration-beta slot="image" variant="success" status="success"></gux-illustration-beta>`
  },
  {
    name: 'additional-guidance',
    html: `<div slot="additional-guidance">Please refresh this page to try again.</div>`
  },
  {
    name: 'secondary-call-to-action',
    html: `<button slot="secondary-call-to-action" type="button">Call to action</button>`
  }
].map(({ name, html }) => ({
  description: `should render component as expected when "${name}" slot is provided`,
  html: `
         <gux-blank-state-beta>
         <div slot="primary-message">Sorry, something went wrong.</div>
         <button slot="call-to-action" type="button">Call to action</button>
          ${html}
        </gux-blank-state-beta>
  `
}));

const alignmentRenderConfigs = ['left', 'center'].map(alignment => ({
  description: `should render component with alignment "${alignment}"`,
  html: `
      <gux-blank-state-beta alignment="${alignment}">
        <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
        <div slot="primary-message">${alignment} aligned blank state</div>
      </gux-blank-state-beta>
    `
}));

const attributeRenderConfigs = [
  {
    description: 'should render component with no-padding attribute',
    html: `
      <gux-blank-state-beta no-padding>
        <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
        <div slot="primary-message">No padding blank state</div>
      </gux-blank-state-beta>
    `
  }
];

export const renderConfigs = [
  ...basicRenderConfig,
  ...optionalSlotRenderConfigs,
  ...alignmentRenderConfigs,
  ...attributeRenderConfigs
];
