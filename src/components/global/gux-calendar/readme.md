# genesys-calendar

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute           | Description                                         | Type     | Default                                                                     |
| ---------------- | ------------------- | --------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `firstDayOfWeek` | `first-day-of-week` | The calendar first week day (default to 0 (sunday)) | `number` | `0`                                                                         |
| `fromValue`      | --                  | The calendar current from range value               | `Date`   | `new Date()`                                                                |
| `locale`         | `locale`            | The calendar locale (default to browser locale)     | `string` | `navigator.languages     ? navigator.languages[0]     : navigator.language` |
| `mode`           | `mode`              | The calendar mode (can be single or range)          | `string` | `CalendarModes.Single`                                                      |
| `numberOfMonths` | `number-of-months`  | The calendar number of months displayed             | `number` | `1`                                                                         |
| `toValue`        | --                  | The calendar current to range value                 | `Date`   | `new Date()`                                                                |
| `value`          | --                  | The calendar current selected date                  | `Date`   | `new Date()`                                                                |


## Events

| Event    | Description                   | Type                |
| -------- | ----------------------------- | ------------------- |
| `change` | Triggered user selects a date | `CustomEvent<void>` |


## Methods

### `focusPreviewDate() => void`

Focus the preview date

#### Returns

Type: `void`



### `setValue(value: Date | Date[]) => void`

Sets new value and rerender the calendar

#### Parameters

| Name    | Type             | Description |
| ------- | ---------------- | ----------- |
| `value` | `Date \| Date[]` |             |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
