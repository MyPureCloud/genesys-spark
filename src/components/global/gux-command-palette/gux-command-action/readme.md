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

| Property   | Attribute  | Description                                                                                                    | Type      | Default |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `common`   | `common`   | If the command is a common command. Common commands are choosen defaults a user might want to use.             | `boolean` | `false` |
| `details`  | `details`  | Details about the command. This acts as extra contextual information about the command.                        | `string`  | `''`    |
| `recent`   | `recent`   | If the command is a recent command. Recent commands are commands that the user has recently issued.            | `boolean` | `false` |
| `shortcut` | `shortcut` | The shortcut for the command. Textual representation of a shortcut associated with this command, if it exists. | `string`  | `''`    |
| `text`     | `text`     | The textual value of the command.                                                                              | `string`  | `''`    |


## Events

| Event   | Description                                                     | Type                |
| ------- | --------------------------------------------------------------- | ------------------- |
| `press` | Emits when the list item is clicked, or enter/space is pressed. | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
