# gux-icon

Used to display genesys standard icons.

## Sizing

There are a couple ways to determine the size of the icon.

1. pass the `size` property to set the height and width to the same value
2. apply css `height` and `width` properties to the `.gux-icon` class

NOTE: Changing the height and width properties to different values may not work as you expect unless the specific icon you are using has [preserveAspectRatio="none"](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)

## Coloring

The icon has default colors determined by the theme. If you wish to override this color simple apply the `color` css style to `.gux-icon`

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                           | Type      | Default     |
| ------------ | ------------ | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `decorative` | `decorative` | Indicate whether the icon should be ignored by accessibility tools or not             | `boolean` | `false`     |
| `iconname`   | `iconname`   | Indicate which icon to display                                                        | `string`  | `undefined` |
| `label`      | `label`      | Localized text describing the intent of this icon (not required if `decorative=true`) | `string`  | `undefined` |
| `size`       | `size`       | Sets the height and width of the icon (in pixels)                                     | `number`  | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*