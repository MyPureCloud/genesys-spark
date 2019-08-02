# gux-command-action
An action to display in the command palette. Actions can be recent, common or neither.

## Adding a common action
```xml
    <gux-command-action text="Hello World" common></gux-command-action>
```

## Adding a recent action
```xml
    <gux-command-action text="Hello World" recent></gux-command-action>
```

## Adding a standard action
```xml
    <gux-command-action text="Hello World"></gux-command-action>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                         | Type      | Default     |
| ---------- | ---------- | ----------------------------------- | --------- | ----------- |
| `common`   | `common`   | If the command is a common command. | `boolean` | `undefined` |
| `details`  | `details`  | Details about the command.          | `string`  | `undefined` |
| `recent`   | `recent`   | If the command is a recent command. | `boolean` | `undefined` |
| `shortcut` | `shortcut` | The shortcut for the command.       | `string`  | `undefined` |
| `text`     | `text`     | The textual value of the command.   | `string`  | `undefined` |


## Events

| Event    | Description                                                     | Type                |
| -------- | --------------------------------------------------------------- | ------------------- |
| `action` | Emits when the list item is clicked, or enter/space is pressed. | `CustomEvent<void>` |


## Methods

### `invokeAction() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
