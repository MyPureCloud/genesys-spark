const componentAttributesRenderConfigs = [
  { componentAttribute: '' },
  { componentAttribute: 'display-units="%"' },
  { componentAttribute: 'value-in-tooltip' },
  { componentAttribute: 'value-in-tooltip display-units="%"' }
].map(({ componentAttribute }, index) => ({
  description: `should render component as expected (${index + 1})`,
  html: `
    <gux-form-field-range ${componentAttribute}>
      <input slot="input" type="range"/>
      <label slot="label">Label</label>
    </gux-form-field-range>
  `
}));

const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-range label-position="${labelPosition}">
        <input slot="input" type="range"/>
        <label slot="label">Label</label>
      </gux-form-field-range>
  `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-range>
        <input slot="input" type="range" ${inputAttribute}/>
        <label slot="label">Label</label>
      </gux-form-field-range>
  `
  })
);

const rangeAttributesRenderConfigs = [
  {
    description:
      'should render component as expected with step/min/max attributes',
    html: `
    <gux-form-field-range>
      <input slot="input" type="range" value="10" step="5" min="-25" max="25"/>
      <label slot="label">Step / Min / Max</label>
    </gux-form-field-range>
  `
  }
];

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
      <gux-form-field-range indicator-mark="${indicatorMark}">
        <input slot="input" type="range"/>
        <label slot="label">Label</label>
      </gux-form-field-range>
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
    <gux-form-field-range>
      <input slot="input" type="range" name="e-1" />
      <label slot="label">Default</label>
      ${html}
    </gux-form-field-range>
  `
}));

export const renderConfigs = [
  ...componentAttributesRenderConfigs,
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...rangeAttributesRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
