# gux-form-field-legacy

[Back to main guide](./readme.md)

This should be a simple migration as there 100% compatibility between the legacy component and the stable components. You will only need to change the tag name from `gux-form-field-legacy` to `gux-form-field-{type}`.

These stable form field components have some properties that were not available in the legacy version that you should review to see if they are useful to your use case.

For slotted inputs that mapping is as follows:

- input[type="checkbox"] => `gux-form-field-checkbox`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-checkbox>
    <input slot="input" type="checkbox" name="food" value="pizza" />
    <label slot="label">Pizza</label>
- </gux-form-field-legacy>
+ </gux-form-field-checkbox>
```

- input[type="radio"] => `gux-form-field-radio`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-radio>
    <input slot="input" type="radio" name="dinner" value="pizza" />
    <label slot="label">Pizza</label>
- </gux-form-field-legacy>
+ </gux-form-field-radio>
```

- input[type="color"] => `gux-form-field-color`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-color>
    <input slot="input" name="color" type="color" value="#1da8b3" />
    <label slot="label">Color</label>
- </gux-form-field-legacy>
+ </gux-form-field-color>
```

- input[type="range"] => `gux-form-field-range`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-range>
    <input slot="input" type="range" name="du-1" />
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-range>
```

- input[type="email"] => `gux-form-field-text-like`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-text-like>
      <input
        slot="input"
        type="email"
        name="t-3"
        value="joe.bloggs@example.com"
      />
      <label slot="label">Email</label>
- </gux-form-field-legacy>
+ </gux-form-field-text-like>
```

- input[type="password"] => `gux-form-field-text-like`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-text-like>
    <input
      slot="input"
      name="password"
      type="password"
      placeholder="Enter a password"
    />
    <label slot="label">Password</label>
- </gux-form-field-legacy>
+ </gux-form-field-text-like>
```

- input[type="text"] => `gux-form-field-text-like`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-text-like>
    <input slot="input" type="text" name="c-1" value="Sample text" />
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-text-like>
```

- input[type="number"] => `gux-form-field-number`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-number>
    <input slot="input" type="number" name="c-1" value="10" />
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-number>
```

- input[type="search"] => `gux-form-field-search`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-search>
    <input slot="input" type="search" name="lp-1" />
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-search>
```

For slotted selects that mapping is as follows:

- select => `gux-form-field-select`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-select>
    <select slot="input" name="lp-1">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-select>
```

For slotted textareas that mapping is as follows:

- textarea => `gux-form-field-textarea`

```diff
- <gux-form-field-legacy>
+ <gux-form-field-textarea>
    <textarea slot="input" name="textarea"></textarea>
    <label slot="label">Default</label>
- </gux-form-field-legacy>
+ </gux-form-field-textarea>
```
