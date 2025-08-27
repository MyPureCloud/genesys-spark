export const renderConfigs = [
  `
  <gux-form-field-checkbox-group-beta>
    <label slot="group-label">Food</label>
    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="pizza"/>
      <label slot="label">Pizza</label>
    </gux-form-field-checkbox>
  </gux-form-field-checkbox-group-beta>
  `,
  `
  <gux-form-field-checkbox-group-beta>
  <label slot="group-label">Food</label>

  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1" value="pizza" />
    <label slot="label">Pizza</label>
  </gux-form-field-checkbox>

  <gux-form-field-checkbox>
    <input
      slot="input"
      type="checkbox"
      name="food-1"
      value="sandwich"
      disabled
    />
    <label slot="label">Sandwich</label>
  </gux-form-field-checkbox>

  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
    <label slot="label">Spaghetti</label>
    <span slot="help">This is a help message</span>
  </gux-form-field-checkbox>
  <span slot="group-error">Subject to availibility</span>
</gux-form-field-checkbox-group-beta>
  `,
  `<gux-form-field-checkbox-group-beta>
  <label slot="group-label">Food</label>

  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1" value="pizza" />
    <label slot="label">Pizza</label>
  </gux-form-field-checkbox>

  <gux-form-field-checkbox>
    <input
      slot="input"
      type="checkbox"
      name="food-1"
      value="sandwich"
      disabled
    />
    <label slot="label">Sandwich</label>
  </gux-form-field-checkbox>

  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1" value="sushi" />
    <label slot="label">Sushi</label>
    <span slot="error">Subject to availibility</span>
  </gux-form-field-checkbox>

  <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
    <label slot="label">Spaghetti</label>
    <span slot="help">This is a help message</span>
  </gux-form-field-checkbox>
  <span slot="group-help">This is a group help message</span>
</gux-form-field-checkbox-group-beta>
`,
  `
  <gux-form-field-checkbox-group-beta disabled>
    <label slot="group-label">Food</label>

    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="pizza" />
      <label slot="label">Pizza</label>
    </gux-form-field-checkbox>

    <gux-form-field-checkbox>
      <input
        slot="input"
        type="checkbox"
        name="food-1"
        value="sandwich"
        disabled
      />
      <label slot="label">Sandwich</label>
    </gux-form-field-checkbox>

    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="sushi" />
      <label slot="label">Sushi</label>
      <span slot="error">Subject to availibility</span>
    </gux-form-field-checkbox>

    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="spaghetti" />
      <label slot="label">Spaghetti</label>
      <span slot="help">This is a help message</span>
    </gux-form-field-checkbox>
  </gux-form-field-checkbox-group-beta>
  `,
  `
  <gux-form-field-checkbox-group-beta required>
    <label slot="group-label">Food</label>
    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="pizza"/>
      <label slot="label">Pizza</label>
    </gux-form-field-checkbox>
  </gux-form-field-checkbox-group-beta>
  `,
  `
  <gux-form-field-checkbox-group-beta indicator-mark="optional">
    <label slot="group-label">Food</label>
    <gux-form-field-checkbox>
      <input slot="input" type="checkbox" name="food-1" value="pizza"/>
      <label slot="label">Pizza</label>
    </gux-form-field-checkbox>
  </gux-form-field-checkbox-group-beta>
  `
].map(html => ({ html }));
