# gux-dropdown-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                          | Type      | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | If this Boolean attribute is set, this option is not checkable. It won't receive any browsing events, like mouse clicks or focus-related ones.                                                                       | `boolean` | `undefined` |
| `filtered` | `filtered` | If this Boolean attribute is set, the option is not visible to the select control. This does not mean that it clears the selection if it was previously selected.  Should only be used by internal users.            | `boolean` | `undefined` |
| `selected` | `selected` | If present, this Boolean attribute indicates that the option is currently selected.                                                                                                                                  | `boolean` | `undefined` |
| `text`     | `text`     |                                                                                                                                                                                                                      | `string`  | `undefined` |
| `value`    | `value`    | The content of this attribute represents the value to be submitted on 'input' changes, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element. | `string`  | `undefined` |


## Events

| Event             | Description                             | Type                  |
| ----------------- | --------------------------------------- | --------------------- |
| `selectedChanged` | Occurs when the item has been selected. | `CustomEvent<string>` |


## Methods

### `getDisplayedValue() => Promise<string>`

Gets the value rendered by the drop down item.

#### Returns

Type: `Promise<string>`



### `shouldFilter(searchInput: string) => Promise<boolean>`

Determines if the search input matches this option.

#### Parameters

| Name          | Type     | Description                          |
| ------------- | -------- | ------------------------------------ |
| `searchInput` | `string` | The input string being searched for. |

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
