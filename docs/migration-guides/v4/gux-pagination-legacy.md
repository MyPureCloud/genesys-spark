# gux-pagination-legacy

[Back to main guide](./readme.md)

A full migration of `gux-pagination` upgrades the design to the latest UX standards and allows for easier design changes through css tokens.

## V3 gux-pagination example

```html
<gux-pagination total-items="123" items-per-page="25"></gux-pagination>
```

## V4 Basic Migration: Add "-legacy" to tag name

Steps:

- Replace the `gux-pagination` tag with `gux-pagination-legacy` tag

```diff
- <gux-pagination total-items="123" items-per-page="25">
+ <gux-pagination-legacy total-items="123" items-per-page="25">
  ...
- </gux-pagination>
+ <gux-pagination-legacy>
```

Completed V3 Basic Migration

```html
<gux-pagination-legacy
  total-items="123"
  items-per-page="25"
></gux-pagination-legacy>
```

## V4 Full Migration

The `layout` property options have changed.

Steps:

- Replace `expanded` or `full` to `advanced`.

```diff
- <gux-pagination total-items="123" items-per-page="25" layout="expanded"></gux-pagination>
- <gux-pagination total-items="123" items-per-page="25" layout="full"></gux-pagination>
+ <gux-pagination total-items="123" items-per-page="25" layout="advanced"></gux-pagination>
```

- Replace `small` to `simple`.

```diff
- <gux-pagination total-items="123" items-per-page="25" layout="small"></gux-pagination>
+ <gux-pagination total-items="123" items-per-page="25" layout="simple"></gux-pagination>
```
