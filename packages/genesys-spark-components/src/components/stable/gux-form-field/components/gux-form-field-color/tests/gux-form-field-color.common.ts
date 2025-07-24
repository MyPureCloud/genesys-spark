const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
    <gux-form-field-color label-position="${labelPosition}">
      <input slot="input" type="color" value="#cc3ebe"/>
      <label slot="label">Label</label>
    </gux-form-field-color>
  `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
    <gux-form-field-color>
      <input slot="input" type="color" value="#cc3ebe" ${inputAttribute}/>
      <label slot="label">Label</label>
    </gux-form-field-color>
  `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
    <gux-form-field-color indicator-mark="${indicatorMark}">
      <input slot="input" type="color" value="#cc3ebe"/>
      <label slot="label">Label</label>
    </gux-form-field-color>
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
    <gux-form-field-color>
      <input slot="input" type="color" value="#cc3ebe"/>
      <label slot="label">Label</label>
      ${html}
    </gux-form-field-color>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
