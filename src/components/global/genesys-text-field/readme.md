# genesys-text-field

This component is an html input component having update indicator or error/warning message on it.
You can specify a validation function to add this test on input. You can do it by yourself using the input event and
changing error-message attribute.

## Example usage

``` html
<genesys-text-field>
</genesys-text-field>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                             | Type      |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| `debounceTimeout`  | `debounce-timeout`   | Timeout between input and validation.                                                                   | `number`  |
| `disabled`         | `disabled`           | Disable the input and prevent interactions.                                                             | `boolean` |
| `errorMessageType` | `error-message-type` | The message type (warning or error)                                                                     | `string`  |
| `errorMessage`     | `error-message`      | The message displayed on validation failure.                                                            | `string`  |
| `labelPosition`    | `label-position`     | The input label position (can be left or right) if not defined the position depends of the label width. | `string`  |
| `label`            | `label`              | The input label.                                                                                        | `string`  |
| `placeholder`      | `placeholder`        | The input placeholder.                                                                                  | `string`  |
| `validation`       | --                   | The input validation.                                                                                   | `any`     |
| `value`            | `value`              | Indicate the input value                                                                                | `string`  |


## Events

| Event   | Detail | Description                 |
| ------- | ------ | --------------------------- |
| `input` |        | Triggered when user inputs. |


## Methods

### `clear() => void`

Clears the input.

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
