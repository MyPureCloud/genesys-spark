# genesys-rating

This component represents a simple rating component.
You can allow the half rating by using the props allowHalfRatings.
SVG used for the star is also a prop. You can specify a custom svg view box and svg points if needed.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                      | Type       |
| ------------------ | -------------------- | ---------------------------------------------------------------- | ---------- |
| `allowHalfRatings` | `allow-half-ratings` | Determines if half ratings are allowed                           | `boolean`  |
| `disabled`         | `disabled`           | Determines if the user can set a rating                          | `boolean`  |
| `labels`           | --                   | The labels for each stars                                        | `string[]` |
| `maxRating`        | `max-rating`         | The maximum rating possible                                      | `number`   |
| `rating`           | `rating`             | The rating                                                       | `number`   |
| `svgPoints`        | `svg-points`         | The polygon points to create the svg. By default this is a star! | `string`   |
| `svgViewBox`       | `svg-view-box`       | The view box for the SVG                                         | `string`   |


## Events

| Event    | Description                      |
| -------- | -------------------------------- |
| `update` | Triggered when the value changed |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
