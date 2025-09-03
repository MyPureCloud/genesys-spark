const inputAttributeRenderConfigs = [
  { inputAttribute: '', description: 'default' },
  { inputAttribute: 'disabled', description: 'disabled' },
  { inputAttribute: 'checked', description: 'checked' }
].map(({ inputAttribute, description }) => ({
  description: `should render component as expected when ${description}`,
  html: `
    <gux-form-field-radio>
      <input slot="input" type="radio" name="food-1" value="pizza" ${inputAttribute}/>
      <label slot="label">Pizza</label>
    </gux-form-field-radio>
  `
}));

const optionalSlotRenderConfigs = [
  { name: 'help', html: `<span slot="help">This is a help message</span>` },
  { name: 'error', html: `<span slot="error">This is an error message</span>` }
].map(({ name, html }) => ({
  description: `should render component as expected when an optional "${name}" slot is provided`,
  html: `
    <gux-form-field-radio>
      <input slot="input" type="radio" name="food-1" value="pizza"/>
      <label slot="label">Pizza</label>
      ${html}
    </gux-form-field-radio>
  `
}));

const combinedStateRenderConfigs = [
  {
    description: 'should render component as expected when disabled with error',
    html: `
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
        <label slot="label">Pizza</label>
        <span slot="error">Error message</span>
      </gux-form-field-radio>
    `
  },
  {
    description: 'should render component as expected when disabled with help',
    html: `
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
        <label slot="label">Pizza</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>
    `
  }
];

export const renderConfigs = [
  ...inputAttributeRenderConfigs,
  ...optionalSlotRenderConfigs,
  ...combinedStateRenderConfigs
];
