# gux-error-message-beta

[Back to main guide](./readme.md)

This component was removed from the library as it was no longer used internally and it is not a standalone part of the Design system.
As it is a presentational component the migration path away from the component is to recreate its functionality in your app.

## V3 Example

```html
<gux-error-message-beta>This is an error message</gux-error-message-beta>
```

## V4 Full Migration

```html
<div class="gux-container">
  <gux-icon icon-name="alert-warning-octogon" decorative></gux-icon>
  <div class="gux-message">This is an error message</div>
</div>
```

```css
.gux-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 11px;
  color: #2e394c;
}

gux-icon {
  flex: 0 1 auto;
  align-self: auto;
  order: 0;
  width: 16px;
  height: 16px;
  margin: 0 4px;
  color: #ea0b0b;
}

.gux-message {
  flex: 0 1 auto;
  align-self: auto;
  order: 0;
}
```

_Note: The above migration example will match the v3 version. Consider if changes are appropriate in your app to better align the style with v4 of the Design System._
