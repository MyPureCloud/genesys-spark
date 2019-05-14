# gux-search

The gux-search control is a styled-replacement of the 'search'-type input HTML element.  Currently only
performs a search request when the 'return' key is pressed.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                 | Type      | Default     |
| ------------- | ------------- | ------------------------------------------- | --------- | ----------- |
| `disabled`    | `disabled`    | Disable the input and prevent interactions. | `boolean` | `false`     |
| `placeholder` | `placeholder` | The input placeholder.                      | `string`  | `undefined` |
| `value`       | `value`       | Indicate the input search value             | `string`  | `''`        |


## Events

| Event    | Description                                           | Type                |
| -------- | ----------------------------------------------------- | ------------------- |
| `input`  | Triggered when the user inputs data into the control. | `CustomEvent<void>` |
| `search` | Triggered when a search is requested.                 | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
