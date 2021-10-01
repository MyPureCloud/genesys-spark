# gux-switch

## Native Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `InputEvent`       |
| `input`  |             | `InputEvent`       |

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                    | Description | Type                              | Default     |
| ------------------------- | ---------------------------- | ----------- | --------------------------------- | ----------- |
| `chartData`               | --                           |             | `{ [x: string]: unknown; }`       | `undefined` |
| `colorFieldName`          | `color-field-name`           |             | `string`                          | `undefined` |
| `embedOptions`            | --                           |             | `EmbedOptions<string, Renderers>` | `undefined` |
| `includeDataPointMarkers` | `include-data-point-markers` |             | `boolean`                         | `undefined` |
| `includeLegend`           | `include-legend`             |             | `boolean`                         | `undefined` |
| `includeStrokeDash`       | `include-stroke-dash`        |             | `boolean`                         | `undefined` |
| `interpolation`           | `interpolation`              |             | `string`                          | `undefined` |
| `legendTitle`             | `legend-title`               |             | `string`                          | `undefined` |
| `xAxisTitle`              | `x-axis-title`               |             | `string`                          | `undefined` |
| `xFieldName`              | `x-field-name`               |             | `string`                          | `undefined` |
| `yAxisTitle`              | `y-axis-title`               |             | `string`                          | `undefined` |
| `yFieldName`              | `y-field-name`               |             | `string`                          | `undefined` |


## Dependencies

### Depends on

- [gux-visualization-beta](../gux-visualization)

### Graph
```mermaid
graph TD;
  gux-chart-line-beta --> gux-visualization-beta
  style gux-chart-line-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
