# gux-dropdown-legacy

[Back to main guide](./readme)

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

* `setLabeledBy(id: string) => Promise<void>`
* `setSelected() => Promise<void>`

## V3 Basic Migration

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

* `setLabeledBy(id: string) => Promise<void>`
* `setSelected() => Promise<void>`

## V3 Full Migration

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

 * `default` - accepts a `gux-listbox` |

### Events

| Event    | Description  | Type         |
| -------- | -------------| ------------ |
| `input`  | native event | `InputEvent` |
| `change` | native event | `InputEvent` |
