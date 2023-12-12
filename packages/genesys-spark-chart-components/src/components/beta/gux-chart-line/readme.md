# gux-chart-line-beta

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute                    | Description                                                                                                                                           | Type                                                                                                               | Default     |
| ------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `chartData`               | --                           | Data to be rendered in the chart. Data field names must match the values you set in xFieldName and yFieldName                                         | `{ [x: string]: any; }`                                                                                            | `undefined` |
| `colorFieldName`          | `color-field-name`           |                                                                                                                                                       | `string`                                                                                                           | `undefined` |
| `embedOptions`            | --                           |                                                                                                                                                       | `EmbedOptions<string, Renderers>`                                                                                  | `undefined` |
| `includeDataPointMarkers` | `include-data-point-markers` |                                                                                                                                                       | `boolean`                                                                                                          | `undefined` |
| `includeLegend`           | `include-legend`             |                                                                                                                                                       | `boolean`                                                                                                          | `undefined` |
| `interpolation`           | `interpolation`              |                                                                                                                                                       | `string`                                                                                                           | `undefined` |
| `legendPosition`          | `legend-position`            |                                                                                                                                                       | `"bottom" \| "bottom-left" \| "bottom-right" \| "left" \| "none" \| "right" \| "top" \| "top-left" \| "top-right"` | `'right'`   |
| `legendTitle`             | `legend-title`               | Title to display above the optional legend                                                                                                            | `string`                                                                                                           | `undefined` |
| `strokeDash`              | `stroke-dash`                |                                                                                                                                                       | `boolean`                                                                                                          | `undefined` |
| `xAxisTitle`              | `x-axis-title`               | Title to display along the x-axis                                                                                                                     | `string`                                                                                                           | `undefined` |
| `xFieldName`              | `x-field-name`               | Name for the data field to use to populate the chart's x-axis e.g. xFieldName of "category" will map any "category" fields in chartData to the x-axis | `string`                                                                                                           | `undefined` |
| `xTickLabelSlant`         | `x-tick-label-slant`         | If true, then make Axis tick label 45 degrees                                                                                                         | `boolean`                                                                                                          | `undefined` |
| `yAxisTitle`              | `y-axis-title`               | Title to display along the y-axis                                                                                                                     | `string`                                                                                                           | `undefined` |
| `yFieldName`              | `y-field-name`               | Name for the data field to use to populate the chart's x-axis e.g. yFieldName of "value" will map any "value" fields in chartData to the y-axis       | `string`                                                                                                           | `undefined` |

## Dependencies

### Depends on

- [gux-visualization-beta](../gux-visualization)

### Graph

```mermaid
graph TD;
  gux-chart-line-beta --> gux-visualization-beta
  style gux-chart-line-beta fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
