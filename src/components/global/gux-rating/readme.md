# gux-rating

This component represents a simple rating component.
You can allow the half rating by using the props allowHalfRatings.
SVG used for the star is also a prop. You can specify a custom svg view box and svg points if needed.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                      | Type       | Default                                                              |
| ------------------ | -------------------- | ---------------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| `allowHalfRatings` | `allow-half-ratings` | Determines if half ratings are allowed                           | `boolean`  | `false`                                                              |
| `disabled`         | `disabled`           | Determines if the user can set a rating                          | `boolean`  | `false`                                                              |
| `labels`           | --                   | The labels for each stars                                        | `string[]` | `[]`                                                                 |
| `maxRating`        | `max-rating`         | The maximum rating possible                                      | `number`   | `5`                                                                  |
| `rating`           | `rating`             | The rating                                                       | `number`   | `0`                                                                  |
| `svgPoints`        | `svg-points`         | The polygon points to create the svg. By default this is a star! | `string`   | `'12,5 14,10 19,10 15.133,13.988 17,19 12,16 7,19 9,14 5,10 10,10 '` |
| `svgViewBox`       | `svg-view-box`       | The view box for the SVG                                         | `string`   | `'0 0 24 24'`                                                        |


## Events

| Event    | Description                      | Type               |
| -------- | -------------------------------- | ------------------ |
| `update` | Triggered when the value changed | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
