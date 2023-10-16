# gux-advanced-dropdown-legacy

[Back to main guide](./readme.md)

A full migration of `gux-advanced-dropdown` upgrades the design to the latest UX standards and allows for easier design changes through css tokens.

## V3 gux-advanced-dropdown example

```html
<gux-advanced-dropdown filter-debounce-timeout="250">
  <gux-dropdown-option
    value="en-US"
    text="American English"
  ></gux-dropdown-option>
  <gux-dropdown-option
    selected
    value="es"
    text="Latin American Spanish"
  ></gux-dropdown-option>
</gux-advanced-dropdown>
```

## V4 Basic Migration: Add "-legacy" to tag name

Steps:

- Replace the `gux-advanced-dropdown` tag with `gux-advanced-dropdown-legacy` tag

```diff
- <gux-advanced-dropdown
+ <gux-advanced-dropdown-legacy
    filter-debounce-timeout="250"
  >
    <gux-dropdown-option
      value="en-US"
      text="American English"
    ></gux-dropdown-option>
    <gux-dropdown-option
      selected
      value="es"
      text="Latin American Spanish"
    ></gux-dropdown-option>
- </gux-advanced-dropdown>
+ </gux-advanced-dropdown-legacy>
```

Completed V4 Basic Migration:

```html
<gux-advanced-dropdown-legacy filter-debounce-timeout="250">
  <gux-dropdown-option
    value="en-US"
    text="American English"
  ></gux-dropdown-option>
  <gux-dropdown-option
    selected
    value="es"
    text="Latin American Spanish"
  ></gux-dropdown-option>
</gux-advanced-dropdown-legacy>
```

## V4 Full Migration

Steps:

Replace the `gux-advanced-dropdown` tag with `gux-dropdown`

```diff
- <gux-advanced-dropdown>
+ <gux-dropdown>
  ...
- <gux-advanced-dropdown>
+ <gux-dropdown>
```

Replace the `gux-dropdown-option` tags with `gux-option`

```diff
  <gux-dropdown>
-   <gux-dropdown-option
+   <gux-option
      value="en-US"
      text="American English"
-   ></gux-dropdown-option>
+   ></gux-option>
-   <gux-dropdown-option
+   <gux-option
      selected
      value="es"
      text="Latin American Spanish"
-   ></gux-dropdown-option>
+   ></gux-option>
  </gux-dropdown>
```

Move the value form the `text` property to the inner text of the `gux-option` tags

```diff
  <gux-dropdown>
-    <gux-option
-     value="en-US"
-     text="American English"
-   ></gux-option>
+   <gux-option value-"en-US">
+     American English
+   </gux-option>
    <gux-option
      selected
      value="es"
-     text="Latin American Spanish"
-   ></gux-option>
+   >Latin American Spanish</gux-option>
  </gux-dropdown>
```

Add a `gux-listbox` between the `gux-dropdown` and `gux-option` tags. For full accessibility, also add a descriptive `aria-label`.

```diff
  <gux-dropdown>
+   <gux-listbox aria-label="Languages">
    ...
+   </gux-listbox>
  </gux-dropdown>
```

To enable basic client-side filtering, set the `filter-type` property to `starts-with`.

```diff
- <gux-dropdown>
+ <gux-dropdown filter-type="starts-with">
    <gux-listbox aria-label="Languages">
      <gux-option value="en-US">
        American English
      </gux-option>
      <gux-option
        selected
        value="es"
      >Latin American Spanish</gux-option>
    </gux-listbox>
  </gux-dropdown>
```

For more complex filtering, set the `filter-type` property to `custom`. This will prevent the component from filtering the options automatically, allowing you to respond to `guxfilter` events.

_Note: debouncing filter events is not supported by `gux-dropdown` but can be implemented by your application or other libraries._

```diff
- <gux-dropdown filter-debounce-timeout="250">
+ <gux-dropdown filter-type="custom">
    <gux-listbox aria-label="Languages">
      <gux-option value="en-US">
        American English
      </gux-option>
      <gux-option
        selected
        value="es"
      >Latin American Spanish</gux-option>
    </gux-listbox>
  </gux-dropdown>
```

If the component is loading data, you can use the `loading` property.

```diff
  <gux-dropdown
    filter-type="custom"
+   loading="true"
  >
    <gux-listbox aria-label="Languages">
      <gux-option value="en-US">
        American English
      </gux-option>
      <gux-option
        selected
        value="es"
      >Latin American Spanish</gux-option>
    </gux-listbox>
  </gux-dropdown>
```

Replace the `dropdown-height` property with a `max-height` style on the `gux-listbox`.

```diff
- <gux-dropdown dropdown-height="200px">
+ <gux-dropdown>
-   <gux-listbox aria-label="Languages">
+   <gux-listbox
+     aria-label="Languages"
+     style="max-height: 200px"
+   >
      <gux-option value="en-US">
        American English
      </gux-option>
      <gux-option
        selected
        value="es"
      >Latin American Spanish</gux-option>
    </gux-listbox>
  </gux-dropdown>
```

Completed V4 Full Migration to `gux-dropdown`

```html
<gux-dropdown filter-type="custom">
  <gux-listbox aria-label="Languages">
    <gux-option value="en-US"> American English </gux-option>
    <gux-option selected value="es">Latin American Spanish</gux-option>
  </gux-listbox>
</gux-dropdown>
```

### Properties

| Property      | Attribute     | Description | Type                                  | Default     |
| ------------- | ------------- | ----------- | ------------------------------------- | ----------- |
| `disabled`    | `disabled`    |             | `boolean`                             | `false`     |
| `filterType`  | `filter-type` |             | `"custom" \| "none" \| "starts-with"` | `'none'`    |
| `hasError`    | `has-error`   |             | `boolean`                             | `false`     |
| `loading`     | `loading`     |             | `boolean`                             | `false`     |
| `placeholder` | `placeholder` |             | `string`                              | `undefined` |
| `required`    | `required`    |             | `boolean`                             | `false`     |
| `value`       | `value`       |             | `string`                              | `undefined` |

### Slots

| Slot      | Description             |
| --------- | ----------------------- |
| `default` | accepts a `gux-listbox` |

### Events

| Event          | Description  | Type                  |
| -------------- | ------------ | --------------------- |
| `input`        | native event | `InputEvent`          |
| `change`       | native event | `InputEvent`          |
| `guxcollapsed` |              | `CustomEvent<void>`   |
| `guxexpanded`  |              | `CustomEvent<void>`   |
| `guxfilter`    |              | `CustomEvent<string>` |
