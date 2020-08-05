# gux-radio-group

This component aggregates events and selection logic for `gux-radio` components.  Any child `gux-radio` will automatically be detected, and have it's `name` updated to match the group, so as to keep them in sync.

## Example Usage

```
<gux-radio-group name="food-selection" onInput={ev => this.handleRadioSelection(ev)}>
  <gux-radio value="pizza">I like pizza!</gux-radio>
  <gux-radio value="pasta">I like pasta!</gux-radio>
</gux-radio-group>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                | Type     | Default     |
| -------- | --------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `name`   | `name`    | The name of the radio group.  Automatically propagates down to gux-radios. | `string` | `undefined` |
| `value`  | `value`   | The selected value of the radio group.                                     | `any`    | `undefined` |


## Events

| Event   | Description                                                             | Type               |
| ------- | ----------------------------------------------------------------------- | ------------------ |
| `input` | Fires when the selected radio value changes, with the groups new value. | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
