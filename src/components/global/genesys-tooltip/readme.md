# genesys-tooltip

This custom component is a simple tooltip.

When hovering a node, the tooltip will be shown below.

If there is not enough space on the bottom, or right of the component, the tooltip position will be adjusted.

## Example usage:

``` html
<!-- First option (With parentElement) -->
<div id="container">
  <button>Button</button>
  <genesys-tooltip
    text='My great tooltip'>
  </genesys-tooltip>
</div>

<!-- Second option (With parent id in for attribute) -->
<genesys-tooltip
  id="interactive"
  text="My awesome tooltip"
  for="container"
  delay="500">
</genesys-tooltip>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                           | Type      |
| --------- | ---------- | ------------------------------------- | --------- |
| `delay`   | `delay`    | Delay before hide. (Set to 0 to none) | `number`  |
| `for`     | `for`      | Element's id.                         | `string`  |
| `isShown` | `is-shown` | Tooltip current state.                | `boolean` |
| `text`    | `text`     | Tooltip text.                         | `string`  |


## Events

| Event    | Detail | Description                          |
| -------- | ------ | ------------------------------------ |
| `hidden` |        | Triggered when the tooltip is hidden |
| `shown`  |        | Triggered when the tooltip is shown  |


## Methods

### `hide() => void`

Hides the tooltip.

#### Returns

Type: `void`



### `show() => void`

Shows the tooltip.

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
