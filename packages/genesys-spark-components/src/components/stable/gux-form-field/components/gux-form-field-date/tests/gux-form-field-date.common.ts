const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <dux-form-field-date-beta label-position="${labelPosition}">
        <input slot="input" type="date" value="2025-09-21" />
        <label slot="label">Label</label>
      </dux-form-field-date-beta>
    `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <dux-form-field-date-beta>
        <input slot="input" type="date" ${inputAttribute} value="2025-09-21"/>
        <label slot="label">Label</label>
      </dux-form-field-date-beta>
    `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
    <dux-form-field-date-beta indicator-mark="${indicatorMark}">
      <input slot="input" type="date" value="2025-09-21" />
      <label slot="label">Label</label>
    </dux-form-field-date-beta>
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
    <dux-form-field-date-beta>
      <input slot="input" type="date" value="2025-09-21" />
      <label slot="label">Label</label>
      ${html}
    </dux-form-field-date-beta>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
