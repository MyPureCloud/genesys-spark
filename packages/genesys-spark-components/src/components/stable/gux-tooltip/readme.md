# gux-tooltip

This custom component is a simple tooltip.

When hovering a node, the tooltip will be shown below.

If there is not enough space on the bottom, or right of the component, the tooltip position will be adjusted.

## Example usage

``` html
<!-- First option (With parentElement) -->
<div>
  <button>Button</button>
  <gux-tooltip>My great tooltip</gux-tooltip>
</div>

<!-- Second option (With parent id in for attribute) -->
<button id="needs-tooltip">Button</button>
<gux-tooltip for="needs-tooltip">My great tooltip</gux-tooltip>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                | Type                                                                                                                                                                 | Default          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `accent`    | `accent`    |                                                                                                            | `"dark" \| "light"`                                                                                                                                                  | `'light'`        |
| `anchor`    | `anchor`    |                                                                                                            | `boolean`                                                                                                                                                            | `false`          |
| `for`       | `for`       | Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used) | `string`                                                                                                                                                             | `undefined`      |
| `placement` | `placement` | Placement of the tooltip. Default is bottom-start                                                          | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |


## Methods

### `hideTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description            |
| ---- | ---------------------- |
|      | Content of the tooltip |


## CSS Custom Properties

| Name                                     | Description |
| ---------------------------------------- | ----------- |
| `--gse-ui-tooltip-borderRadius`          |             |
| `--gse-ui-tooltip-boxShadow-blur`        |             |
| `--gse-ui-tooltip-boxShadow-color`       |             |
| `--gse-ui-tooltip-boxShadow-spread`      |             |
| `--gse-ui-tooltip-boxShadow-x`           |             |
| `--gse-ui-tooltip-boxShadow-y`           |             |
| `--gse-ui-tooltip-dark-backgroundColor`  |             |
| `--gse-ui-tooltip-dark-border-color`     |             |
| `--gse-ui-tooltip-dark-border-style`     |             |
| `--gse-ui-tooltip-dark-border-width`     |             |
| `--gse-ui-tooltip-dark-foregroundColor`  |             |
| `--gse-ui-tooltip-dark-iconColor`        |             |
| `--gse-ui-tooltip-gap`                   |             |
| `--gse-ui-tooltip-height`                |             |
| `--gse-ui-tooltip-light-backgroundColor` |             |
| `--gse-ui-tooltip-light-border-color`    |             |
| `--gse-ui-tooltip-light-border-style`    |             |
| `--gse-ui-tooltip-light-border-width`    |             |
| `--gse-ui-tooltip-light-foregroundColor` |             |
| `--gse-ui-tooltip-light-iconColor`       |             |
| `--gse-ui-tooltip-padding`               |             |
| `--gse-ui-tooltip-text-fontFamily`       |             |
| `--gse-ui-tooltip-text-fontSize`         |             |
| `--gse-ui-tooltip-text-fontWeight`       |             |
| `--gse-ui-tooltip-text-lineHeight`       |             |


## Dependencies

### Used by

 - [gux-copy-to-clipboard](../gux-copy-to-clipboard)
 - [gux-pagination-ellipsis-button](../../beta/gux-pagination-beta/gux-pagination-buttons-beta/gux-pagination-ellipsis-button)
 - [gux-table-toolbar-custom-action](../../beta/gux-table-toolbar/gux-table-toolbar-custom-action)
 - [gux-tooltip-title](../gux-tooltip-title)
 - [gux-truncate](../gux-truncate)

### Graph
```mermaid
graph TD;
  gux-copy-to-clipboard --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-table-toolbar-custom-action --> gux-tooltip
  gux-tooltip-title --> gux-tooltip
  gux-truncate --> gux-tooltip
  style gux-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
