# gux-tooltip-base-beta



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                  | Type                                                                                                                                                                 | Default          |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `accent`     | `accent`      |                                                                                                                                              | `"dark" \| "light"`                                                                                                                                                  | `'light'`        |
| `forElement` | --            | Indicates the element the popover should anchor to.                                                                                          | `HTMLElement`                                                                                                                                                        | `undefined`      |
| `offsetX`    | `offset-x`    |                                                                                                                                              | `number`                                                                                                                                                             | `0`              |
| `offsetY`    | `offset-y`    |                                                                                                                                              | `number`                                                                                                                                                             | `0`              |
| `placement`  | `placement`   | Placement of the tooltip. Default is bottom-start                                                                                            | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `tooltipId`  | `tooltip-id`  |                                                                                                                                              | `string`                                                                                                                                                             | `undefined`      |
| `visualOnly` | `visual-only` | Determines whether the text in the tooltip is read by screenreaders. Use for cases where the forElement component handles the accessibility. | `boolean`                                                                                                                                                            | `false`          |


## Methods

### `hideTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description      |
| ----------- | ---------------- |
| `"content"` | Slot for content |


## Dependencies

### Used by

 - [gux-form-field-range](../../stable/gux-form-field/components/gux-form-field-range)
 - [gux-tooltip-beta](../gux-tooltip-beta)

### Graph
```mermaid
graph TD;
  gux-form-field-range --> gux-tooltip-base-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  style gux-tooltip-base-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
