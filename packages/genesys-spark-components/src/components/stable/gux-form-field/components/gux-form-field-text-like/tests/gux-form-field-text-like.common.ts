const clearableRenderConfigs = [
  { componentAttribute: '', inputAttribute: '' },
  { componentAttribute: 'clearable', inputAttribute: '' },
  { componentAttribute: 'clearable="true"', inputAttribute: '' },
  { componentAttribute: 'clearable="false"', inputAttribute: '' },
  { componentAttribute: 'clearable', inputAttribute: 'disabled' }
].map(({ componentAttribute, inputAttribute }, index) => ({
  description: `should render clearable component as expected (${index + 1})`,
  html: `
    <gux-form-field-text-like ${componentAttribute}>
      <input slot="input" type="text" value="Sample text" ${inputAttribute}/>
      <label slot="label">Label</label>
    </gux-form-field-text-like>
  `
}));

const loadingRenderConfigs = [
  { componentAttribute: '', inputAttribute: '' },
  { componentAttribute: 'loading', inputAttribute: '' },
  { componentAttribute: 'loading="true"', inputAttribute: '' },
  { componentAttribute: 'loading="false"', inputAttribute: '' },
  { componentAttribute: 'loading', inputAttribute: 'disabled' }
].map(({ componentAttribute, inputAttribute }, index) => ({
  description: `should render loading component as expected (${index + 1})`,
  html: `
    <gux-form-field-text-like ${componentAttribute}>
      <input slot="input" type="text" value="Sample text" ${inputAttribute}/>
      <label slot="label">Label</label>
    </gux-form-field-text-like>
  `
}));

const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-text-like label-position="${labelPosition}">
        <input slot="input" type="text" value="Sample text"/>
        <label slot="label">Label</label>
      </gux-form-field-text-like>
  `
  })
);

const inputTypeRenderConfigs = ['email', 'password', 'text'].map(inputType => ({
  description: `should render component as expected when input type is "${inputType}"`,
  html: `
      <gux-form-field-text-like>
        <input slot="input" type="${inputType}" value="Sample text" />
        <label slot="label">Label</label>
      </gux-form-field-text-like>
    `
}));

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-text-like>
        <input slot="input" type="text" value="Sample text" ${inputAttribute}/>
        <label slot="label">Label</label>
      </gux-form-field-text-like>
  `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
      <gux-form-field-text-like indicator-mark="${indicatorMark}">
        <input slot="input" type="text" value="Sample text"/>
        <label slot="label">Label</label>
      </gux-form-field-text-like>
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
  },
  { name: 'prefix', html: `<span slot="prefix">Prefix</span>` },
  { name: 'suffix', html: `<span slot="suffix">Suffix</span>` }
].map(({ name, html }) => ({
  description: `should render component as expected when an optional "${name}" slot is provided`,
  html: `
    <gux-form-field-text-like>
      <input slot="input" type="text" name="e-1" />
      <label slot="label">Default</label>
      ${html}
    </gux-form-field-text-like>
  `
}));

export const renderConfigs = [
  ...clearableRenderConfigs,
  ...loadingRenderConfigs,
  ...labelPositionRenderConfigs,
  ...inputTypeRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
