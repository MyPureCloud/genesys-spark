const resizeRenderConfigs = ['auto', 'manual', 'none'].map(resize => ({
  description: `should render component as expected when resize is ${resize}`,
  html: `
      <gux-form-field-textarea resize="${resize}">
        <textarea slot="input"></textarea>
        <label slot="label">Label</label>
      </gux-form-field-textarea>
    `
}));

const labelPositionRenderConfigs = ['above', 'beside', 'screenreader'].map(
  labelPosition => ({
    description: `should render component as expected when label-position is ${labelPosition}`,
    html: `
      <gux-form-field-textarea label-position="${labelPosition}">
        <textarea slot="input"></textarea>
        <label slot="label">Label</label>
      </gux-form-field-textarea>
    `
  })
);

const inputAttributeRenderConfigs = ['disabled', 'required'].map(
  inputAttribute => ({
    description: `should render component as expected when input attribute is "${inputAttribute}"`,
    html: `
      <gux-form-field-textarea>
        <textarea slot="input" ${inputAttribute}></textarea>
        <label slot="label">Label</label>
      </gux-form-field-textarea>
    `
  })
);

const indicatorMarkRenderConfigs = ['optional', 'required'].map(
  indicatorMark => ({
    description: `should render component as expected when indicator-mark is "${indicatorMark}"`,
    html: `
    <gux-form-field-textarea indicator-mark="${indicatorMark}">
      <textarea slot="input"></textarea>
      <label slot="label">Label</label>
    </gux-form-field-textarea>
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
    <gux-form-field-textarea>
      <textarea slot="input"></textarea>
      <label slot="label">Label</label>
      ${html}
    </gux-form-field-textarea>
  `
}));

export const renderConfigs = [
  ...resizeRenderConfigs,
  ...labelPositionRenderConfigs,
  ...inputAttributeRenderConfigs,
  ...indicatorMarkRenderConfigs,
  ...optionalSlotRenderConfigs
];
