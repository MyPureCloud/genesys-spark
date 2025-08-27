export const renderConfigs = [
  `
  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
    <label slot="label">Pizza</label>
  </gux-form-field-checkbox>
`,
  `
  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1[]" value="pizza" disabled/>
    <label slot="label">Pizza</label>
  </gux-form-field-checkbox>
`,
  `
  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
    <label slot="label">Pizza</label>
    <span slot="error">This is an error message</span>
  </gux-form-field-checkbox>
`,
  `
  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1[]" value="pizza" checked/>
    <label slot="label">Pizza</label>
  </gux-form-field-checkbox>
`,
  `
  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
    <label slot="label">Pizza</label>
    <span slot="help">This is a help message</span>
  </gux-form-field-checkbox>
`
].map(html => ({ html }));
