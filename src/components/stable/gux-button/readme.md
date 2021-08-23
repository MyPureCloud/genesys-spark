# gux-button

This custom component is a simple button having some styling on it.
You can choose between two type (secondary and primary).

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                  | Type                                     | Default       |
| ---------- | ----------- | -------------------------------------------- | ---------------------------------------- | ------------- |
| `accent`   | `accent`    | The component accent (secondary or primary). | `"primary" \| "secondary" \| "tertiary"` | `'secondary'` |
| `disabled` | `disabled`  | Indicate if the button is disabled or not    | `boolean`                                | `false`       |
| `guxTitle` | `gux-title` | The component title                          | `string`                                 | `undefined`   |
| `title`    | `title`     | Deprecated, use guxTitle instead             | `string`                                 | `undefined`   |
| `type`     | `type`      | The component button type                    | `"button" \| "reset" \| "submit"`        | `'button'`    |


## Methods

### `focusElement() => Promise<void>`

Focus the button

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [gux-pagination-buttons](../gux-pagination/gux-pagination-buttons)
 - [gux-table-beta](../../beta/gux-table)

### Graph
```mermaid
graph TD;
  gux-pagination-buttons --> gux-button
  gux-table-beta --> gux-button
  style gux-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
