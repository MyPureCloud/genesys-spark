const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-phone label-position="${labelPosition}">
        <gux-phone-input-beta></gux-phone-input-beta>
        <label slot="label">Label</label>
      </gux-form-field-phone>
  `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
      <gux-form-field-phone indicator-mark="${indicatorMark}">
        <gux-phone-input-beta></gux-phone-input-beta>
        <label slot="label">Label</label>
      </gux-form-field-phone>
  `
  })
);

const optionalSlotRenderConfigs = [
  { name: 'help', html: `<span slot="help">This is a help message</span>` },
  { name: 'error', html: `<span slot="error">This is an error message</span>` },
  {
    name: 'label-info',
    html: `<gux-label-info-beta slot="label-info">
      <span slot="content">This is some tooltip text</span>
    </gux-label-info-beta>`
  }
].map(({ name, html }) => ({
  description: `should render component as expected when an optional "${name}" slot is provided`,
  html: `
    <gux-form-field-phone>
      <gux-phone-input-beta></gux-phone-input-beta>
      <label slot="label">Label</label>
      ${html}
    </gux-form-field-phone>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
