const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-search label-position="${labelPosition}">
        <input slot="input" type="search" value="Sample search"/>
        <label slot="label">Label</label>
      </gux-form-field-search>
  `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-search>
        <input slot="input" type="search" value="Sample search" ${inputAttribute}/>
        <label slot="label">Label</label>
      </gux-form-field-search>
  `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
      <gux-form-field-search indicator-mark="${indicatorMark}">
        <input slot="input" type="search" value="Sample search"/>
        <label slot="label">Label</label>
      </gux-form-field-search>
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
    <gux-form-field-search>
      <input slot="input" type="search" name="e-1" />
      <label slot="label">Default</label>
      ${html}
    </gux-form-field-search>
  `
}));

export const renderConfigs = [
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
