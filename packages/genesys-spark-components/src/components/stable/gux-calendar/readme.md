# genesys-calendar

This is a simple calendar component, that allows the user to select a date.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute           | Description                                                                                                   | Type                                          | Default                |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------- |
| `maxDate`        | `max-date`          | The max date selectable                                                                                       | `string`                                      | `''`                   |
| `minDate`        | `min-date`          | The min date selectable                                                                                       | `string`                                      | `''`                   |
| `mode`           | `mode`              | The calendar mode (can be single or range)                                                                    | `CalendarModes.Range \| CalendarModes.Single` | `CalendarModes.Single` |
| `numberOfMonths` | `number-of-months`  | The calendar number of months displayed                                                                       | `number`                                      | `1`                    |
| `startDayOfWeek` | `start-day-of-week` | The day of the week to start each calendar row. ISO weekday number ie 1 - Monday, 2 - Tuesday, ... 7 - Sunday | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7`        | `undefined`            |
| `value`          | `value`             | The calendar current selected date                                                                            | `string`                                      | `''`                   |


## Events

| Event            | Description                        | Type                  |
| ---------------- | ---------------------------------- | --------------------- |
| `calendarSelect` | Triggered when user selects a date | `CustomEvent<string>` |


## Methods

### `focusPreviewDate() => Promise<void>`

Focus the preview date

#### Returns

Type: `Promise<void>`



### `resetCalendarView(value: Date) => Promise<void>`

Reset calendar view to show first selected date

#### Returns

Type: `Promise<void>`



### `setValue(value: Date | [Date, Date]) => Promise<void>`

Sets new value and rerender the calendar

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [gux-datepicker](../gux-datepicker)

### Depends on

- [gux-icon](../gux-icon)

### Graph
```mermaid
graph TD;
  gux-calendar --> gux-icon
  gux-datepicker --> gux-calendar
  style gux-calendar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
