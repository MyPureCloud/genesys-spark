# gux-all-row-select



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `disabled` | `disabled` |             | `boolean` | `undefined` |
| `selected` | `selected` |             | `boolean` | `false`     |


## Events

| Event                        | Description | Type               |
| ---------------------------- | ----------- | ------------------ |
| `internalallrowselectchange` |             | `CustomEvent<any>` |


## Methods

### `setIndeterminate(indeterminate?: boolean) => Promise<void>`



#### Parameters

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| `indeterminate` | `boolean` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [gux-form-field-checkbox](../../gux-form-field/components/gux-form-field-checkbox)

### Graph
```mermaid
graph TD;
  gux-all-row-select --> gux-form-field-checkbox
  gux-form-field-checkbox --> gux-icon
  gux-form-field-checkbox --> gux-form-field-label-indicator
  style gux-all-row-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
