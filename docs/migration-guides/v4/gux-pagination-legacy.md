# gux-pagination-legacy

[Back to main guide](./readme.md)

In `v4` we will transition the `gux-pagination` component to a `legacy` status while promoting the `gux-pagination-beta` to a `stable` status.

## Overview

- `gux-pagination` is transitioning to `gux-pagination-legacy`
- `gux-pagination-beta` is transitioning to `gux-pagination` which will have a new refreshed design and includes a new property `go-to-page` which allows a user to search for a page.

## V3 gux-pagination example

```html
<gux-pagination total-items="123" items-per-page="25"></gux-pagination>
```

## V4 Full Migration

Steps:

- Replace the `gux-pagination` tag with `gux-pagination-legacy` tag

```diff
- <gux-pagination
+ <gux-pagination-legacy
     total-items="123"
     items-per-page="25"
  >
- </gux-pagination>
+ </gux-pagination-legacy>
```

## Properties

| Property       | Attribute        | Description                                                                     | Type                              | Default  |
| -------------- | ---------------- | ------------------------------------------------------------------------------- | --------------------------------- | -------- |
| `currentPage`  | `current-page`   | The currently select page. Changes are watched by the component.                | `number`                          | `1`      |
| `itemsPerPage` | `items-per-page` | The max number of items on a page. Used to calculate total page count           | `100 \| 25 \| 50 \| 75`           | `25`     |
| `layout`       | `layout`         | The pagination component can have different layouts to suit the available space | `"expanded" \| "full" \| "small"` | `'full'` |
| `totalItems`   | `total-items`    | The total number of items in the data set. Used to calculate total page count   | `number`                          | `0`      |

## Events

| Event                 | Description | Type                                                          |
| --------------------- | ----------- | ------------------------------------------------------------- |
| `guxpaginationchange` |             | `CustomEvent<{ currentPage: number; itemsPerPage: number; }>` |
