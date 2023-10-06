# gux-dropdown-legacy

[Back to main guide](./readme.md)

A full migration of the `gux-dropdown` component improves the overall accessible ease of use and addresses the `2.1.1 Keyboard`, `2.4.7 Focus Visible`, and `4.1.2: Name, Role, Value` WCAG Success Criteria.

## V2 Example

```html
<gux-dropdown placeholder="Select an animal">
  <gux-option value="a">Ant</gux-option>
  <gux-option value="b">Bat</gux-option>
  <gux-option value="c">Cat</gux-option>
  <gux-option value="d">Dog</gux-option>
</gux-dropdown>
```

### Properties

| Property      | Attribute     | Description                                      | Type                               | Default     |
| ------------- | ------------- | ------------------------------------------------ | ---------------------------------- | ----------- |
| `disabled`    | `disabled`    | Disable the input and prevent interactions.      | `boolean`                          | `false`     |
| `filterable`  | `filterable`  | Whether the user can filter or not.              | `boolean`                          | `undefined` |
| `mode`        | `mode`        | Sets the select mode (default, page or palette). | `"default" \| "page" \| "palette"` | `'default'` |
| `placeholder` | `placeholder` | The dropdown placeholder.                        | `string`                           | `undefined` |
| `value`       | `value`       | Indicate the dropdown input value                | `string`                           | `''`        |

### Events

| Event    | Description                      | Type                  |
| -------- | -------------------------------- | --------------------- |
| `change` | Emits when selection is changed. | `CustomEvent<string>` |

### Methods

- `setLabeledBy(id: string) => Promise<void>`
- `setSelected() => Promise<void>`

## V3 Basic Migration: Add "-legacy" to tag names

Steps:

- Replace the `gux-dropdown` tag with `gux-dropdown-legacy`

```diff
-  <gux-dropdown placeholder="Select an animal">
+  <gux-dropdown-legacy placeholder="Select an animal">
...
-  </gux-dropdown>
+  </gux-dropdown-legacy>
```

- Replace the `gux-option` tag with `gux-option-legacy`

```diff
-  <gux-option value="a">Ant</gux-option>
+  <gux-option-legacy value="a">Ant</gux-option-legacy>
```

Completed V3 Basic Migration:

```html
<gux-dropdown-legacy placeholder="Select an animal">
  <gux-option-legacy value="a">Ant</gux-option-legacy>
  <gux-option-legacy value="b">Bat</gux-option-legacy>
  <gux-option-legacy value="c">Cat</gux-option-legacy>
  <gux-option-legacy value="d">Dog</gux-option-legacy>
</gux-dropdown-legacy>
```

### Properties

| Property      | Attribute     | Description                                      | Type                               | Default     |
| ------------- | ------------- | ------------------------------------------------ | ---------------------------------- | ----------- |
| `disabled`    | `disabled`    | Disable the input and prevent interactions.      | `boolean`                          | `false`     |
| `filterable`  | `filterable`  | Whether the user can filter or not.              | `boolean`                          | `undefined` |
| `mode`        | `mode`        | Sets the select mode (default, page or palette). | `"default" \| "page" \| "palette"` | `'default'` |
| `placeholder` | `placeholder` | The dropdown placeholder.                        | `string`                           | `undefined` |
| `value`       | `value`       | Indicate the dropdown input value                | `string`                           | `''`        |

### Events

| Event    | Description                      | Type                  |
| -------- | -------------------------------- | --------------------- |
| `change` | Emits when selection is changed. | `CustomEvent<string>` |

### Methods

- `setLabeledBy(id: string) => Promise<void>`
- `setSelected() => Promise<void>`

## V3 Full Migration

Steps:

- Add a `gux-listbox` component as a container for the `gux-option` components. `gux-listbox` requires an `aria-label` for accessibility compliance.

```diff
  <gux-dropdown placeholder="Select an animal">
+   <gux-listbox aria-label="Animals">
      <gux-option value="a">Ant</gux-option>
      <gux-option value="b">Bat</gux-option>
      <gux-option value="c">Cat</gux-option>
      <gux-option value="d">Dog</gux-option>
+   </gux-listbox>
  </gux-dropdown>
```

Completed V3 Basic Migration

```html
<gux-dropdown placeholder="Select an animal">
  <gux-listbox aria-label="Animals">
    <gux-option value="a">Ant</gux-option>
    <gux-option value="b">Bat</gux-option>
    <gux-option value="c">Cat</gux-option>
    <gux-option value="d">Dog</gux-option>
  </gux-listbox>
</gux-dropdown>
```

### Properties

| Property      | Attribute     | Type      | Default     |
| ------------- | ------------- | --------- | ----------- |
| `disabled`    | `disabled`    | `boolean` | `false`     |
| `filterable`  | `filterable`  | `boolean` | `false`     |
| `placeholder` | `placeholder` | `string`  | `undefined` |
| `value`       | `value`       | `string`  | `undefined` |

### Slots

- `default` - accepts a `gux-listbox` |

### Events

| Event    | Description  | Type         |
| -------- | ------------ | ------------ |
| `input`  | native event | `InputEvent` |
| `change` | native event | `InputEvent` |
