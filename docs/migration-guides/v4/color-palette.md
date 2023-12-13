# Color Variables

[Back to main guide](./readme.md)

In V4, we are using Spark tokens for colors and will no longer be exporting the following color palette variables. Read more about the new Spark 4.0 Design System color palette on the [Spark Design System documentation site](https://spark.genesys.com/latest/foundations/color/core-palette/design-XYztDeyk)

## V4 Basic Migration

The color variables `gux-color-value` no longer exist within v4 and have been replaced with the corresponding hex values outlined in the tables below.

Example:

You are using `gux-blue-10` within your application. This value can be replaced with the equivalent hex value. `gux-blue-10` now becomes `#172b52`.

```diff
- color: gux-blue-10;
+ color: #172b52;
```

### Blue

| Variable     | Value   |
| ------------ | ------- |
| gux-blue-10  | #172b52 |
| gux-blue-20  | #1c3363 |
| gux-blue-30  | #203b73 |
| gux-blue-40  | #23478f |
| gux-blue-50  | #2754ac |
| gux-blue-60  | #2a60c8 |
| gux-blue-70  | #5084e3 |
| gux-blue-80  | #75a8ff |
| gux-blue-90  | #aac9ff |
| gux-blue-100 | #deeaff |

### Black

| Variable      | Value   |
| ------------- | ------- |
| gux-black-10  | #000000 |
| gux-black-20  | #151d28 |
| gux-black-30  | #202937 |
| gux-black-40  | #283243 |
| gux-black-50  | #2e394c |
| gux-black-60  | #364154 |
| gux-black-70  | #3e4a5b |
| gux-black-80  | #4c5667 |
| gux-black-90  | #596373 |
| gux-black-100 | #6b7585 |

### Grey

| Variable     | Value   |
| ------------ | ------- |
| gux-grey-10  | #8a97ad |
| gux-grey-20  | #99a4b8 |
| gux-grey-30  | #b4bccb |
| gux-grey-40  | #c8cfda |
| gux-grey-50  | #d7dce5 |
| gux-grey-60  | #e2e6ee |
| gux-grey-70  | #e8ecf2 |
| gux-grey-80  | #eff1f5 |
| gux-grey-90  | #f6f7f9 |
| gux-grey-100 | #fdfdfd |

### Alert Red

| Variable          | Value   |
| ----------------- | ------- |
| gux-alert-red-10  | #520404 |
| gux-alert-red-20  | #700505 |
| gux-alert-red-30  | #8f0707 |
| gux-alert-red-40  | #ad0808 |
| gux-alert-red-50  | #cc0a0a |
| gux-alert-red-60  | #ea0b0b |
| gux-alert-red-70  | #ef4343 |
| gux-alert-red-80  | #f37a7a |
| gux-alert-red-90  | #f8b2b2 |
| gux-alert-red-100 | #fceaea |

### Alert Yellow

| Variable             | Value   |
| -------------------- | ------- |
| gux-alert-yellow-10  | #523800 |
| gux-alert-yellow-20  | #755000 |
| gux-alert-yellow-30  | #976700 |
| gux-alert-yellow-40  | #ba7f00 |
| gux-alert-yellow-50  | #dc9600 |
| gux-alert-yellow-60  | #ffae00 |
| gux-alert-yellow-70  | #fbbe3b |
| gux-alert-yellow-80  | #fcd276 |
| gux-alert-yellow-90  | #fce5b1 |
| gux-alert-yellow-100 | #fdf8ec |

### Alert Green

| Variable            | Value   |
| ------------------- | ------- |
| gux-alert-green-10  | #0d3d00 |
| gux-alert-green-20  | #164b08 |
| gux-alert-green-30  | #205a10 |
| gux-alert-green-40  | #296817 |
| gux-alert-green-50  | #33771f |
| gux-alert-green-60  | #3c8527 |
| gux-alert-green-70  | #69a358 |
| gux-alert-green-80  | #95c189 |
| gux-alert-green-90  | #c2deb9 |
| gux-alert-green-100 | #eefcea |

### Secondary Palette

| Variable                   | Value   |
| -------------------------- | ------- |
| gux-navy-sec               | #203b73 |
| gux-blue-sec               | #75a8ff |
| gux-electric-purple-sec    | #8452cf |
| gux-plum-sec               | #5e5782 |
| gux-lilac-sec              | #b5b5eb |
| gux-fuscha-sec             | #cc3ebe |
| gux-fuchsia-sec            | #cc3ebe |
| gux-bubblegum-pink-sec     | #ff8fdd |
| gux-aqua-green-sec         | #1da8b3 |
| gux-olive-green-sec        | #868c1e |
| gux-alert-yellow-green-sec | #ddd933 |
| gux-dark-purple-sec        | #5e5782 |

### Brand Colors

| Variable                  | Value   |
| ------------------------- | ------- |
| gux-genesys-charcoal-grey | #33383d |
| gux-genesys-off-white     | #fdfdfd |
| gux-genesys-plum          | #5d3d5e |
| gux-genesys-warm-red      | #ff4f1f |
| gux-genesys-teal          | #00ae9e |
| gux-genesys-navy          | #23395d |
| gux-genesys-light-blue    | #3b90aa |
| gux-genesys-yellow        | #ff8f14 |

### V1 Legacy

| Variable          | Value   |
| ----------------- | ------- |
| gux-blue          | #75a8ff |
| gux-charcoal-grey | #444a52 |
| gux-dark-blue     | #2a60c8 |
| gux-off-white     | #fdfdfd |
| gux-warm-red      | #ff4f1f |

## V4 Full Migration

To use one of the new tokens from the Spark 4.0 color palette you can simply use the prefix `gse-core-color` followed by the color and weight you wish to use.

Example you would like to use `blueberry` with a weight of `100`. The token would be `--gse-core-color-blueberry-100`. Below is an example of how you would use this in your application.

```diff
.gux-container {
+ color: var(--gse-core-color-blueberry-100);
}
```

You can find out more about the new Spark 4.0 Design System color palette on the [Spark Design System documentation site](https://spark.genesys.com/latest/foundations/color/core-palette/design-XYztDeyk)
