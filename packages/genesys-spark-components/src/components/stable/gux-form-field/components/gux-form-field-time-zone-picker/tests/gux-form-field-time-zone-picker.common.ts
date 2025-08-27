const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-time-zone-picker label-position="${labelPosition}">
        <gux-time-zone-picker-beta value="Etc/GMT+1" workspace-default="Etc/GMT" local-default="America/Detroit"></gux-time-zone-picker-beta>
        <label slot="label">Label</label>
      </gux-form-field-time-zone-picker>
    `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-time-zone-picker>
        <gux-time-zone-picker-beta value="Etc/GMT+1" workspace-default="Etc/GMT" local-default="America/Detroit" ${inputAttribute}></gux-time-zone-picker-beta>
        <label slot="label">Label</label>
      </gux-form-field-time-zone-picker>
    `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
    <gux-form-field-time-zone-picker indicator-mark="${indicatorMark}">
      <gux-time-zone-picker-beta value="Etc/GMT+1" workspace-default="Etc/GMT" local-default="America/Detroit"></gux-time-zone-picker-beta>
      <label slot="label">Label</label>
    </gux-form-field-time-zone-picker>
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
    <gux-form-field-time-zone-picker>
      <gux-time-zone-picker-beta value="Etc/GMT+1" workspace-default="Etc/GMT" local-default="America/Detroit"></gux-time-zone-picker-beta>
      <label slot="label">Label</label>
      ${html}
    </gux-form-field-time-zone-picker>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
