# gux-tooltip

This custom component is a simple tooltip.

When hovering a node, the tooltip will be shown below.

If there is not enough space on the bottom, or right of the component, the tooltip position will be adjusted.

## Example usage:

``` html
<!-- First option (With parentElement) -->
<div id="container">
  <button>Button</button>
  <gux-tooltip
    text='My great tooltip'>
  </gux-tooltip>
</div>

<!-- Second option (With parent id in for attribute) -->
<gux-tooltip
  id="interactive"
  text="My awesome tooltip"
  for="container"
  delay="500">
</gux-tooltip>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                           | Type      | Default     |
| --------- | ---------- | ------------------------------------- | --------- | ----------- |
| `delay`   | `delay`    | Delay before hide. (Set to 0 to none) | `number`  | `1000`      |
| `for`     | `for`      | Element's id.                         | `string`  | `undefined` |
| `isShown` | `is-shown` | Tooltip current state.                | `boolean` | `false`     |
| `text`    | `text`     | Tooltip text.                         | `string`  | `undefined` |


## Events

| Event    | Description                          | Type                |
| -------- | ------------------------------------ | ------------------- |
| `hidden` | Triggered when the tooltip is hidden | `CustomEvent<void>` |
| `shown`  | Triggered when the tooltip is shown  | `CustomEvent<void>` |


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
