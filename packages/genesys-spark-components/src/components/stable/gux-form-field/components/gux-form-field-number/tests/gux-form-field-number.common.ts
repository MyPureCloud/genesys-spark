const clearableRenderConfigs = [
  { componentAttribute: '', inputAttribute: '' },
  { componentAttribute: 'clearable', inputAttribute: '' },
  { componentAttribute: 'clearable="true"', inputAttribute: '' },
  { componentAttribute: 'clearable="false"', inputAttribute: '' },
  { componentAttribute: 'clearable', inputAttribute: 'disabled' }
].map(({ componentAttribute, inputAttribute }, index) => ({
  description: `should render clearable component as expected (${index + 1})`,
  html: `
    <gux-form-field-number ${componentAttribute}>
      <input slot="input" type="number" value="123" ${inputAttribute}/>
      <label slot="label">Label</label>
    </gux-form-field-number>
  `
}));

const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-number label-position="${labelPosition}">
        <input slot="input" type="number" value="123"/>
        <label slot="label">Label</label>
      </gux-form-field-number>
  `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-number>
        <input slot="input" type="number" value="123" ${inputAttribute}/>
        <label slot="label">Label</label>
      </gux-form-field-number>
  `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
      <gux-form-field-number indicator-mark="${indicatorMark}">
        <input slot="input" type="number" value="123"/>
        <label slot="label">Label</label>
      </gux-form-field-number>
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
    <gux-form-field-number>
      <input slot="input" type="number" name="e-1" />
      <label slot="label">Default</label>
      ${html}
    </gux-form-field-number>
  `
}));

export const renderConfigs = [
  ...clearableRenderConfigs,
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
