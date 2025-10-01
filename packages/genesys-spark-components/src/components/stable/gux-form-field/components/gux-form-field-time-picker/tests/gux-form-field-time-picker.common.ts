const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-time-picker label-position="${labelPosition}">
        <gux-time-picker value="07:00"></gux-time-picker>
        <label slot="label">Label</label>
      </gux-form-field-time-picker>
    `
  })
);

const inputAttributeRenderConfigs = [
  'disabled',
  'required',
  'interval="15"',
  'interval="30"',
  'interval="60"'
].map(inputAttribute => ({
  description: `should render component as expected when input attribute is "${inputAttribute}"`,
  html: `
      <gux-form-field-time-picker>
        <gux-time-picker value="07:00" ${inputAttribute}></gux-time-picker>
        <label slot="label">Label</label>
      </gux-form-field-time-picker>
    `
}));

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
    <gux-form-field-time-picker indicator-mark="${indicatorMark}">
      <gux-time-picker value="07:00"></gux-time-picker>
      <label slot="label">Label</label>
    </gux-form-field-time-picker>
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
    <gux-form-field-time-picker>
      <gux-time-picker value="07:00"></gux-time-picker>
      <label slot="label">Label</label>
      ${html}
    </gux-form-field-time-picker>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
