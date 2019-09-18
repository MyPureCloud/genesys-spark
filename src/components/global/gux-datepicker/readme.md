# gux-datepicker

This is a datepicker component, that allows the user to select a date, or a range of date, depending on the component's `mode`.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute           | Description                                                                                 | Type                   | Default                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| `firstDayOfWeek` | `first-day-of-week` | The datepicker first week day (default to 0 (sunday))                                       | `number`               | `0`                                                                         |
| `format`         | `format`            | The datepicker date format (default to mm/dd/yyyy, or specified)                            | `string`               | `'mm/dd/yyyy'`                                                              |
| `label`          | `label`             | The datepicker label (can be a single label, or an array of two if it's a range datepicker) | `string \| string[]`   | `''`                                                                        |
| `locale`         | `locale`            | The calendar locale (default to browser locale)                                             | `string`               | `navigator.languages     ? navigator.languages[0]     : navigator.language` |
| `mode`           | `mode`              | The calendar mode (can be single or range)                                                  | `string`               | `CalendarModes.Single`                                                      |
| `numberOfMonths` | `number-of-months`  | The datepicker number of months displayed                                                   | `number`               | `1`                                                                         |
| `value`          | --                  | The datepicker current value                                                                | `Date \| [Date, Date]` | `new Date()`                                                                |


## Events

| Event   | Description                        | Type                                |
| ------- | ---------------------------------- | ----------------------------------- |
| `input` | Triggered when user selects a date | `CustomEvent<Date \| [Date, Date]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
