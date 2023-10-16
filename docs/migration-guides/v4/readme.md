# V4 Migration Guide

_This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR._

## Breaking changes at a glance

- Typescript updated to v5
- remove `-beta` from components that have been [promoted to stable](#v3-beta-components-promoted-to-stable-in-v4)
- add `-legacy` to components that have been [removed from stable](#v3-stable-components-archived-to-legacy-in-v4)
- migrate away from usage of beta components [removed from v4](#v3-beta-components-removed-from-v4)
- migrate away from usage of legacy components [removed from v4](#v3-legacy-components-removed-from-v4)
- [Stable component changes](#stable-component-changes):
  - TODO

## Other changes at a glance

- Components now use Spark Flare 4.0 styles.
- PopperJS dependency removed. All instances of PopperJS have been replaced with Floating UI. We do not expect this to effect component usage.

## V3 Beta Components Promoted to Stable in V4

Action: _(required)_ remove `-beta` from the tag name of the component.

```diff
- <gux-example-beta>
+ <gux-example>
  ...
- </gux-example-beta>
+ </gux-example>
```

### There have been no API changes in these components.

| V3 tag name                   | V4 tag name              |
| ----------------------------- | ------------------------ |
| gux-blank-state-beta          | gux-blank-state          |
| gux-column-manager-beta       | gux-column-manager       |
| gux-context-menu-beta         | gux-context-menu         |
| gux-inline-alert-beta         | gux-inline-alert         |
| gux-loading-message-beta      | gux-loading-message      |
| gux-popover-beta              | gux-popover              |
| gux-popup-beta                | gux-popup                |
| gux-skip-navigation-list-beta | gux-skip-navigation-list |
| gux-tab-panel                 | gux-tab-panel            |
| gux-table-beta                | gux-table                |
| gux-table-toolbar-beta        | gux-table-toolbar        |
| gux-time-picker-beta          | gux-time-picker          |
| gux-pagination-beta           | gux-pagination           |

### There have been API changes in these components.

| V3 tag name               | V4 tag name          | Migration Guide             |
| ------------------------- | -------------------- | --------------------------- |
| `gux-badge-beta`          | `gux-badge`          | [link](#gux-badge)          |
| `gux-button-slot-beta`    | `gux-button-slot`    | [link](#gux-button-slot)    |
| `gux-dropdown-multi-beta` | `gux-dropdown-multi` | [link](#gux-dropdown-multi) |
| `gux-tag-beta`            | `gux-tag`            | [link](#gux-tag)            |

#### gux-badge

The `color` property has been removed. All uses of the `color` property can be migrated to the `accent` property.

| Color   | Equivalent accent |
| ------- | ----------------- |
| green   | success           |
| inherit | inherit           |
| neutral | info              |
| red     | error             |
| yellow  | warning           |

```diff
- <gux-badge-beta color="green">Text</gux-badge-beta>
- <gux-badge-beta color="inherit">Text</gux-badge-beta>
- <gux-badge-beta color="neutral">Text</gux-badge-beta>
- <gux-badge-beta color="red">Text</gux-badge-beta>
- <gux-badge-beta color="yellow">Text</gux-badge-beta>
+ <gux-badge accent="success">Text</gux-badge>
+ <gux-badge accent="inherit">Text</gux-badge>
+ <gux-badge accent="info">Text</gux-badge>
+ <gux-badge accent="error">Text</gux-badge>
+ <gux-badge accent="warning">Text</gux-badge>
```

#### gux-tag

- The `color` property has been removed.
  - All uses of the `color` property must be migrated to the `accent` property.
  - There is no guidance for mapping a specific color to an accent as the number of available accents in less than the number of colors that were previously available.
  - If this change effects your use case please reach out to the Design System Team for guidance/assistance.

```diff
- <gux-tag-beta color="navy">Text</gux-tag-beta>
+ <gux-tag accent="1">Text</gux-tag>
```

- The `value` property has been removed.
  - This change also effects the `guxdelete` event. The event no longer contains the `value` in the `detail` field.
  - You should now remove the element using the events `target` to get a reference to the element.

```javascript
document.querySelector('gux-tag').addEventListener('guxdelete', event => {
  event.target.remove();
});
```

#### gux-calendar

The `input` event has been renamed `calendarSelect`

#### gux-popover

An `is-open` prop has been added to control showing and hiding the component. This property should now be used instead of the component's `hidden` global attribute. Note the different context of the new property and old attribute so `hidden="true"` will become `is-open="false"` and vice-versa.

A `min-width` of 280px has been applied to the component.

#### gux-popover-list

An `is-open` prop has been added to control showing and hiding the component. This property should now be used instead of the component's `hidden` global attribute. Note the different context of the new property and old attribute so `hidden="true"` will become `is-open="false"` and vice-versa.

#### gux-dropdown-multi

- The deprecated attribute `filterable` has now been completely removed in favor of `filter-type`.

```diff
- <gux-dropdown-multi-beta filterable>
+ <gux-dropdown-multi filter-type="starts-with">
    ...
  </gux-dropdown-multi>
```

#### gux-button-slot

An `icon-only` only prop has been added. This should be used when the slotted button only contains an icon. This will allow the component to be styled correctly.

## V3 Stable Components Archived to Legacy in V4

| V3 tag name              | V4 tag name                     | V4 stable equivalent (requires API changes)    | Migration Guide                            |
| ------------------------ | ------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `gux-action-toast`       | `gux-action-toast-legacy`       | `gux-toast`                                    | [link](./gux-action-toast-legacy.md)       |
| `gux-disclosure-button`  | `gux-disclosure-button-legacy`  | none                                           | Contact the Design System UX Team          |
| `gux-notification-toast` | `gux-notification-toast-legacy` | `gux-toast`                                    | [link](./gux-notification-toast-legacy.md) |
| `gux-pagination`         | `gux-pagination-legacy`         | `gux-pagination` (`gux-pagination-beta` in v3) | [link](./gux-pagination-legacy.md)         |
| `gux-simple-toast`       | `gux-simple-toast-legacy`       | `gux-toast`                                    | [link](./gux-simple-toast-legacy.md)       |
| `gux-switch`             | `gux-switch-legacy`             | `gux-segmented-control-beta` (or `gux-tabs`)   | [link](./gux-switch-legacy.md)             |
| `gux-modal`              | `gux-modal-legacy`              | `gux-modal`                                    | [link](./gux-modal-legacy.md)              |

Action: _(required)_ add `-legacy` to the tag name of the component.

```diff
- <gux-example>
+ <gux-example-legacy>
  ...
- </gux-example>
+ </gux-example-legacy>
```

If possible, avoid the usage of legacy components that have a migration path and do a full migration to a stable component. The basic migration of adding `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released. If you are using a legacy component that has no documented migration path please contact the Design System UX Team. They will guide you on the best approach to take to remove your dependency on that legacy component.

## V3 Beta Components Removed From V4

| V3 tag name            | V4 equivalent | Migration Guide                     |
| ---------------------- | ------------- | ----------------------------------- |
| gux-error-message-beta | N/A           | [link](./gux-error-message-beta.md) |

## V3 Legacy Components Removed from V4

| V3 tag name                | V4 stable equivalent (requires API changes) | V3 Migration Guide                        |
| -------------------------- | ------------------------------------------- | ----------------------------------------- |
| gux-accordion-legacy       | gux-accordion                               | [link](../v3/gux-accordion-legacy.md)     |
| gux-action-button-legacy   | gux-action-button                           | [link](../v3/gux-action-button-legacy.md) |
| gux-action-list-legacy     | gux-list                                    | [link](../v3/gux-list-legacy.md)          |
| gux-button-multi-legacy    | gux-button-multi                            | [link](../v3/gux-button-multi-legacy.md)  |
| gux-command-palette-legacy | N/A                                         | N/A                                       |
| gux-dropdown-legacy        | gux-dropdown                                | [link](../v3/gux-dropdown-legacy.md)      |
| gux-form-field-legacy      | gux-form-field-{type}                       | [link](../v3/gux-form-field-legacy.md)    |
| gux-list-legacy            | gux-list                                    | [link](../v3/gux-list-legacy.md)          |
| gux-panel-frame-legacy     | N/A                                         | N/A                                       |
| gux-side-panel-legacy      | N/A                                         | N/A                                       |
| gux-tabs-advanced          | gux-tabs, gux-tabs-advanced                 | [link](../v3/gux-tabs-legacy.md)          |
| gux-text-label-legacy      | gux-form-field-{type}                       | [link](../v3/gux-form-field-legacy.md)    |

## Stable Component Changes

### gux-form-field

Internal margins have been removed from the from field components as they were making it difficult for developers to incorporate the components into their existing layouts that already accounted for spacings between components.

In v3, developers could workaround this issue with four CSS custom properties: --gux-form-field-container-margin-top, --gux-form-field-container-margin-bottom, --gux-form-field-fieldset-container-margin-top and --gux-form-field-fieldset-container-margin-bottom. Using these custom properties they could change the internal margins, usually to set them to 0.

In v4, developers who were using the custom properties to set the internal margins to 0 can remove that workaround as it is no longer needed (or supported) and the component not having an internal margin is the default behaviour.

In v4, developers who want the component to have a margin similar to v3 can add `margin: 16px 0 16px 0` to the component in their application.

Below are the components where the internal margins have been removed for v4:

1. gux-form-field-color
2. gux-form-field-number
3. gux-form-field-range
4. gux-form-field-search
5. gux-form-field-select
6. gux-form-field-text-like
7. gux-form-field-textarea

### gux-icon

#### legacy icons

- **No legacy icons have been removed in v4 but how they are accessed has changed.**
- We have removed automatic `legacy/` prefixing of icon names that only existed in the legacy icon list. You may need to add this prefix yourself in v4 and plan to migrate to an official Spark icon.
- We have removed automatic icon mapping from one icon name to another. You may need to change your icon name if you were using an icon name that was mapped to another.
- These changes simplify the icon component as now all icon names are a one-to-one mapping to an svg file.
- These changes should also make it clearer to application teams if the icons they are using are official Spark icons or not.
- The process for adding Official Spark icons has been streamlined and you should contact the UX Design System Team if you require an official replacement for a legacy icon used in your application

### gux-text-highlight

A new `dimmed` property has been added to `gux-text-highlight`. This property changes the color used to highlight the text to a lighter one.

### gux-tooltip

Two new properties have been added to `gux-tooltip` which are `accent` and `anchor` which are outlined below. The default component behavior remains unchanged. We suggest reading the spark design documentation or consulting with your UX contact before using the new properties.

- Addition of `accent` property.
  - The accents `light` and `dark` are currently available to use. The default `accent` is `light`.
  ```diff
  + <gux-tooltip accent="light">Tooltip</gux-tooltip>
  + <gux-tooltip accent="dark">Tooltip</gux-tooltip>
  ```
- Addition of `anchor` property.
  - The `anchor` property will display an anchor on the tooltip pointing towards the target element.
  ```diff
  + <gux-tooltip anchor>Tooltip</gux-tooltip>
  ```

### gux-accordion

#### gux-accordion-section

The `arrow-position` property has had the following changes.

- The `default` value is now `end`.

- The `before-text` value is now `start`.
  ```diff
  - <gux-accordion><gux-accordion-section arrow-position="before-text"></gux-accordion-section></gux-accordion>
  + <gux-accordion><gux-accordion-section arrow-position="start"></gux-accordion-section></gux-accordion>
  ```
- The `beside-text` value is no longer supported.
  ```diff
  - <gux-accordion><gux-accordion-section arrow-position="beside-text"></gux-accordion-section></gux-accordion>
  + <gux-accordion><gux-accordion-section></gux-accordion-section></gux-accordion>
  ```

### gux-radial-progress

The `scale` property has been removed. The displayed percentage will now always be an integer value.

```diff
- <gux-radial-progress scale="2" screenreader-text="Uploading file" value="0" max="100"></gux-radial-progress>
+ <gux-radial-progress screenreader-text="Uploading file" value="0" max="100"></gux-radial-progress>
```

### gux-dropdown

- The deprecated attribute `filterable` has now been completely removed in favor of `filter-type`.

```diff
- <gux-dropdown filterable>
+ <gux-dropdown filter-type="starts-with">
    ...
  </gux-dropdown>
```

### gux-tab-panel

This component now uses a shadow DOM. We do not expect this change to require any updates in applications. If this change does cause you an issue please reach out to the CORE UI team for help.

### gux-action-button

The `title` prop has been removed. Instead, slot in a `span` or `div` with a slot name of `title`.

```diff
- <gux-action-button title="Primary" accent="primary" is-open="true">
+ <gux-action-button accent="primary" is-open="true">
+   <span slot="title">Primary</span>
    <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
  </gux-action-button>
```

### gux-button-multi

The `title` prop has been removed. Instead, slot in a `span` or `div` with a slot name of `title`.

```diff
- <gux-button-multi title="Primary" accent="primary" is-open="true">
+ <gux-button-multi accent="primary" is-open="true">
+   <span slot="title">Primary</span>
    <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
    <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
  </gux-button-multi>
```
