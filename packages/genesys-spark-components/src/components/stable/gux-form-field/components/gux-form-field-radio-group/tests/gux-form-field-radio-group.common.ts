const basicRenderConfigs = [
  {
    description: 'should render basic radio group as expected',
    html: `
    <gux-form-field-radio-group-beta>
      <label slot="group-label">Food</label>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pasta"/>
        <label slot="label">Pasta</label>
      </gux-form-field-radio>
    </gux-form-field-radio-group-beta>
  `
  }
];

const groupAttributeRenderConfigs = [
  { attribute: 'disabled', description: 'disabled' },
  { attribute: 'required', description: 'required' },
  {
    attribute: 'indicator-mark="optional"',
    description: 'with optional indicator mark'
  }
].map(({ attribute, description }) => ({
  description: `should render radio group as expected when ${description}`,
  html: `
    <gux-form-field-radio-group-beta ${attribute}>
      <label slot="group-label">Food</label>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pasta"/>
        <label slot="label">Pasta</label>
      </gux-form-field-radio>
    </gux-form-field-radio-group-beta>
  `
}));

const groupSlotRenderConfigs = [
  {
    name: 'group-help',
    html: `<span slot="group-help">This is a group help message</span>`
  },
  {
    name: 'group-error',
    html: `<span slot="group-error">Subject to availability</span>`
  }
].map(({ name, html }) => ({
  description: `should render radio group as expected when "${name}" slot is provided`,
  html: `
    <gux-form-field-radio-group-beta>
      <label slot="group-label">Food</label>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pasta"/>
        <label slot="label">Pasta</label>
      </gux-form-field-radio>
      ${html}
    </gux-form-field-radio-group-beta>
  `
}));

const complexRenderConfigs = [
  {
    description:
      'should render complex radio group with mixed states as expected',
    html: `
    <gux-form-field-radio-group-beta>
      <label slot="group-label">Food</label>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="pizza"/>
        <label slot="label">Pizza</label>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="sandwich" disabled/>
        <label slot="label">Sandwich</label>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="sushi"/>
        <label slot="label">Sushi</label>
        <span slot="error">Subject to availability</span>
      </gux-form-field-radio>
      <gux-form-field-radio>
        <input slot="input" type="radio" name="food-1" value="spaghetti"/>
        <label slot="label">Spaghetti</label>
        <span slot="help">This is a help message</span>
      </gux-form-field-radio>
      <span slot="group-help">This is a group help message</span>
    </gux-form-field-radio-group-beta>
  `
  }
];

export const renderConfigs = [
  ...basicRenderConfigs,
  ...groupAttributeRenderConfigs,
  ...groupSlotRenderConfigs,
  ...complexRenderConfigs
];
