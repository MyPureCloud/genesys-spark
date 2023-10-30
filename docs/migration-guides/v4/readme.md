# V4 Migration Guide

- [General Changes](#general-changes)
- [Tokenization](#tokenization)
- [Default styles for HTML elements / CSS reset](#default-styles-for-html-elements-css-reset)
- [Component Stability Changes](#component-stability-changes)
  - [V3 Beta Components Promoted to Stable in V4](#v3-beta-components-promoted-to-stable-in-v4)
    - [Component tag rename only, no API changes:](#component-tag-rename-only-no-api-changes)
    - [Component tag rename AND required API changes:](#component-tag-rename-and-required-api-changes)
  - [V3 Stable Components Archived to Legacy in V4](#v3-stable-components-archived-to-legacy-in-v4)
  - [V3 Beta Components Removed From V4](#v3-beta-components-removed-from-v4)
  - [V3 Legacy Components Removed from V4](#v3-legacy-components-removed-from-v4)
- [Component API Changes](#component-api-changes)
  - [V3 Beta Components Promoted to Stable in V4 API Changes](#v3-beta-components-promoted-to-stable-in-v4-api-changes)
    - [gux-badge](#gux-badge)
    - [gux-button-slot](#gux-button-slot)
    - [gux-calendar](#gux-calendar)
    - [gux-dropdown-multi](#gux-dropdown-multi)
    - [gux-popover](#gux-popover)
    - [gux-popover-list](#gux-popover-list)
    - [gux-tag](#gux-tag)
  - [Stable Component API Changes](#stable-component-api-changes)
    - [gux-accordion](#gux-accordion)
    - [gux-action-button](#gux-action-button)
    - [gux-button-multi](#gux-button-multi)
    - [gux-dropdown](#gux-dropdown)
    - [gux-radial-progress](#gux-radial-progress)
    - [gux-form-field (color, number, range, search, select, text-like, textarea)](#gux-form-field-color-number-range-search-select-text-like-textarea)
    - [gux-form-field-checkbox](#gux-form-field-checkbox)
    - [gux-icon (legacy icons)](#gux-icon-legacy-icons)
    - [gux-tabs](#gux-tabs)
    - [gux-tab-panel](#gux-tab-panel)
    - [gux-text-highlight](#gux-text-highlight)
    - [gux-tooltip](#gux-tooltip)

## General Changes

- Typescript updated to v5
- `registerElements()` is no longer an async/promise function.
- Visualizations have been moved out of `genesys-spark-components` into a separate package in the same `genesys-spark` monorepo project, `genesys-spark-visualizations`
- PopperJS dependency removed. All instances of PopperJS have been replaced with Floating UI. We do not expect this to affect component usage.

## Tokenization

In the v4 release, components have gone through a redesign process to adopt the new design system styles. Part of this effort included adopting tokens for styles within the components. Using tokens will simplify design changes in the future, helping us keep aligned with the Spark design system. Since we have moved toward using tokens in the components, some of our shared classes are no longer needed. These include:

- Shadows: see the [shadow styles migration guide](./shadows.md)
- Colors: see the [color palette migration guide](./color-palette.md)
- Spacing: see the [spacing variables migration guide](./spacing.md)

## Default styles for HTML elements / CSS reset

As part of the alignment with the Spark design system, the default styles for HTML elements have changed. While this is not necessarily a breaking change, layouts and spacing of elements may look different after upgrading to V4. Read more about the Spark V4 typography on the [Spark Design System documentation site](https://spark.genesys.com/latest/foundations/typography/design-DZPjXguV)

## Component Stability Changes

As part of our major version release process, we evaluate the following:

- Beta components that have well established APIs may be [promoted to stable](#V3-Beta-Components-Promoted-to-Stable-in-V4)
- Stable components that have been replaced or are no longer supported in the design system may be [moved to legacy](#V3-Stable-Components-Archived-to-Legacy-in-V4)
- Legacy components from the previous version [may be removed](#V3-Legacy-Components-Removed-From-V4)
- Beta components from the previous version [may be removed](#V3-Beta-Components-Removed-From-V4)

More details about this process can be found in the [component evolution documentation](../../../packages/genesys-spark-components/documentation/COMPONENT_EVOLUTION.md)

### V3 Beta Components Promoted to Stable in V4

Action: _(required)_ remove `-beta` from the tag name of the component.

```diff
- <gux-example-beta>
+ <gux-example>
  ...
- </gux-example-beta>
+ </gux-example>
```

#### Component tag rename only, no API changes:

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
| gux-tab-panel-beta            | gux-tab-panel            |
| gux-table-beta                | gux-table                |
| gux-table-toolbar-beta        | gux-table-toolbar        |
| gux-time-picker-beta          | gux-time-picker          |
| gux-pagination-beta           | gux-pagination           |

#### Component tag rename AND required API changes:

| V3 tag name               | V4 tag name          | API Changes                              |
| ------------------------- | -------------------- | ---------------------------------------- |
| `gux-badge-beta`          | `gux-badge`          | [migration details](#gux-badge)          |
| `gux-button-slot-beta`    | `gux-button-slot`    | [migration details](#gux-button-slot)    |
| `gux-dropdown-multi-beta` | `gux-dropdown-multi` | [migration details](#gux-dropdown-multi) |
| `gux-tag-beta`            | `gux-tag`            | [migration details](#gux-tag)            |

### V3 Stable Components Archived to Legacy in V4

| V3 tag name              | V4 tag name                     | V4 stable equivalent (requires API changes)    | Migration Guide                                         |
| ------------------------ | ------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `gux-action-toast`       | `gux-action-toast-legacy`       | `gux-toast`                                    | [migration details](./gux-action-toast-legacy.md)       |
| `gux-disclosure-button`  | `gux-disclosure-button-legacy`  | none                                           | Contact the Design System UX Team                       |
| `gux-notification-toast` | `gux-notification-toast-legacy` | `gux-toast`                                    | [migration details](./gux-notification-toast-legacy.md) |
| `gux-pagination`         | `gux-pagination-legacy`         | `gux-pagination` (`gux-pagination-beta` in v3) | [migration details](./gux-pagination-legacy.md)         |
| `gux-simple-toast`       | `gux-simple-toast-legacy`       | `gux-toast`                                    | [migration details](./gux-simple-toast-legacy.md)       |
| `gux-switch`             | `gux-switch-legacy`             | `gux-segmented-control-beta` (or `gux-tabs`)   | [migration details](./gux-switch-legacy.md)             |
| `gux-modal`              | `gux-modal-legacy`              | `gux-modal`                                    | [migration details](./gux-modal-legacy.md)              |

Action: _(required)_ add `-legacy` to the tag name of the component.

```diff
- <gux-example>
+ <gux-example-legacy>
  ...
- </gux-example>
+ </gux-example-legacy>
```

If possible, avoid the usage of legacy components that have a migration path and do a full migration to a stable component. The basic migration of adding `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released. If you are using a legacy component that has no documented migration path please contact the Design System UX Team. They will guide you on the best approach to take to remove your dependency on that legacy component.

### V3 Beta Components Removed From V4

| V3 tag name            | V4 equivalent | Migration Guide                                  |
| ---------------------- | ------------- | ------------------------------------------------ |
| gux-error-message-beta | N/A           | [migration details](./gux-error-message-beta.md) |

### V3 Legacy Components Removed from V4

| V3 tag name                | V4 stable equivalent (requires API changes) | V3 Migration Guide                                     |
| -------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| gux-accordion-legacy       | gux-accordion                               | [migration details](../v3/gux-accordion-legacy.md)     |
| gux-action-button-legacy   | gux-action-button                           | [migration details](../v3/gux-action-button-legacy.md) |
| gux-action-list-legacy     | gux-list                                    | [migration details](../v3/gux-list-legacy.md)          |
| gux-button-multi-legacy    | gux-button-multi                            | [migration details](../v3/gux-button-multi-legacy.md)  |
| gux-command-palette-legacy | N/A                                         | N/A                                                    |
| gux-dropdown-legacy        | gux-dropdown                                | [migration details](../v3/gux-dropdown-legacy.md)      |
| gux-form-field-legacy      | gux-form-field-{type}                       | [migration details](../v3/gux-form-field-legacy.md)    |
| gux-list-legacy            | gux-list                                    | [migration details](../v3/gux-list-legacy.md)          |
| gux-panel-frame-legacy     | N/A                                         | N/A                                                    |
| gux-side-panel-legacy      | N/A                                         | N/A                                                    |
| gux-tabs-advanced          | gux-tabs, gux-tabs-advanced                 | [migration details](../v3/gux-tabs-legacy.md)          |
| gux-text-label-legacy      | gux-form-field-{type}                       | [migration details](../v3/gux-form-field-legacy.md)    |

## Component API Changes

### V3 Beta Components Promoted to Stable in V4 API Changes

#### gux-badge

- **_New Prop_**: The `color` property has been removed. Instead, now use the `accent` property. All uses of the `color` property can be migrated to the `accent` property.

  | color   | accent  |
  | ------- | ------- |
  | green   | success |
  | inherit | inherit |
  | neutral | info    |
  | red     | error   |
  | yellow  | warning |

  ```diff
  - <gux-badge-beta color="green">Text</gux-badge-beta>
  + <gux-badge accent="success">Text</gux-badge>

  - <gux-badge-beta color="inherit">Text</gux-badge-beta>
  + <gux-badge accent="inherit">Text</gux-badge>

  - <gux-badge-beta color="neutral">Text</gux-badge-beta>
  + <gux-badge accent="info">Text</gux-badge>

  - <gux-badge-beta color="red">Text</gux-badge-beta>
  + <gux-badge accent="error">Text</gux-badge>

  - <gux-badge-beta color="yellow">Text</gux-badge-beta>
  + <gux-badge accent="warning">Text</gux-badge>
  ```

#### gux-button-slot

- **_New Prop_**: An `icon-only` prop has been added. This should be used when the slotted button only contains an icon. This will allow the component to be styled correctly.

```diff
- <gux-button-slot>
+ <gux-button-slot icon-only>
    <button
      type="button"
      title="This will be read by a screen reader"
      onclick="notify(event)"
    >
      <gux-icon icon-name="fa/diamond-regular" decorative></gux-icon>
    </button>
  </gux-button-slot>
```

#### gux-calendar

- **_Event Rename_**: The `input` event has been renamed `calendarSelect`

#### gux-dropdown-multi

- **_Removed Prop_**: The deprecated attribute `filterable` has now been completely removed in favor of `filter-type`. The equivalent to the boolean `filterable` attribute is `filter-type` with a string value of `starts-with`.

```diff
- <gux-dropdown-multi-beta filterable>
+ <gux-dropdown-multi filter-type="starts-with">
    ...
  </gux-dropdown-multi>
```

#### gux-popover

- **_New Prop_**: An `is-open` prop has been added to control showing and hiding the component. This property should now be used instead of the component's `hidden` global attribute. Note the different context of the new property and old attribute so `hidden="true"` will become `is-open="false"` and vice-versa.

- **_Style Change_**: A `min-width` of 280px has been applied to the component.

#### gux-popover-list

- **_New Prop_**: An `is-open` prop has been added to control showing and hiding the component. This property should now be used instead of the component's `hidden` global attribute. Note the different context of the new property and old attribute so `hidden="true"` will become `is-open="false"` and vice-versa.

#### gux-tag

- **_Removed Prop_**: The `color` property has been removed.
- **_New Prop_**: The new `accent` property has been added.
  - All uses of the `color` property must be migrated to the `accent` property.
  - The accent property accepts a number 1-10, `default` or `inherit`
  - The mapping of `color` to `accent` is not 1:1, so there is no specific guidance for mapping a specific color to an accent. The `inherit` property can be used to provide the tag with a custom color.
  - If further guidance is needed for your use case, please reach out to the Design System Team

```diff
- <gux-tag-beta color="navy">Text</gux-tag-beta>
+ <gux-tag accent="1">Text</gux-tag>
```

- **_Removed Prop_**: The `value` property has been removed.

  - This change also effects the `guxdelete` event. The event no longer contains the `value` in the `detail` field.
  - You should now remove the element using the events `target` to get a reference to the element.

  ```javascript
  document.querySelector('gux-tag').addEventListener('guxdelete', event => {
    event.target.remove();
  });
  ```

### Stable Component API Changes

#### gux-accordion

- **_Prop Changes_**: The `arrow-position` property has had the following changes:

  - The default arrow position is now `end`.

  - The `before-text` value has been renamed `start`.
    ```diff
    - <gux-accordion><gux-accordion-section arrow-position="before-text"></gux-accordion-section></gux-accordion>
    + <gux-accordion><gux-accordion-section arrow-position="start"></gux-accordion-section></gux-accordion>
    ```
  - The `beside-text` value has been removed.
    ```diff
    - <gux-accordion><gux-accordion-section arrow-position="beside-text"></gux-accordion-section></gux-accordion>
    + <gux-accordion><gux-accordion-section></gux-accordion-section></gux-accordion>
    ```

#### gux-action-button

- **_Removed Prop_**: The deprecated `title` prop has been removed. Instead, slot in a `span` or `div` with a slot name of `title`.

  ```diff
  - <gux-action-button title="Primary" accent="primary" is-open="true">
  + <gux-action-button accent="primary" is-open="true">
  +   <span slot="title">Primary</span>
      <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
    </gux-action-button>
  ```

#### gux-button-multi

- **_Removed Prop_**: The deprecated `title` prop has been removed. Instead, slot in a `span` or `div` with a slot name of `title`.

  ```diff
  - <gux-button-multi title="Primary" accent="primary" is-open="true">
  + <gux-button-multi accent="primary" is-open="true">
  +   <span slot="title">Primary</span>
      <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
    </gux-button-multi>
  ```

#### gux-dropdown

- **_Removed Prop_**: The deprecated property `filterable` has now been completely removed in favor of `filter-type`. The equivalent to the boolean `filterable` attribute is `filter-type` with a string value of `starts-with`.

```diff
- <gux-dropdown filterable>
+ <gux-dropdown filter-type="starts-with">
    ...
  </gux-dropdown>
```

#### gux-radial-progress

- **_Removed Prop_**: The `scale` property has been removed. The displayed percentage will now always be an integer value.

```diff
- <gux-radial-progress scale="2" screenreader-text="Uploading file" value="0" max="100"></gux-radial-progress>
+ <gux-radial-progress screenreader-text="Uploading file" value="0" max="100"></gux-radial-progress>
```

#### gux-form-field (color, number, range, search, select, text-like, textarea)

- **_Style Change_**: Internal margins have been removed from the from field components.

  This change was implemented to accommodate layouts that already accounted for spacings between components. In v3, developers could override the component margins with four CSS custom properties:

  - --gux-form-field-container-margin-top
  - --gux-form-field-container-margin-bottom
  - --gux-form-field-fieldset-container-margin-top
  - --gux-form-field-fieldset-container-margin-bottom

  These custom properties were used to override the style of the internal margins, (usually to set them to 0).

  In v4, since the internal margin styles have been removed, developers who were using the custom properties to set the internal margins to 0 can remove that workaround as it is no longer needed (or supported).

  In v4, developers who want the component to have a margin similar to v3 can add `margin: 16px 0 16px 0` to the component in their application.

#### gux-form-field-checkbox

- **_New Prop_**: The `label-position` property has now been added to `gux-form-field-checkbox`. The property can be used to change the position of the label.

  - The positions `beside` and `screenreader` are currently available to use. The default `label-position` is `beside`.

  ```diff
  + <gux-form-field-checkbox label-position="beside">
    ...
    </gux-form-field-checkbox>
  + <gux-form-field-checkbox label-position="screenreader">
    ...
    </gux-form-field-checkbox>
  ```

#### gux-icon (legacy icons)

- **No legacy icons have been removed in v4 but how they are accessed has changed.**
- We have removed automatic `legacy/` prefixing of icon names that only existed in the legacy icon list. You may need to add this prefix yourself in v4 and plan to migrate to an official Spark icon.
- We have removed automatic icon mapping from one icon name to another. You may need to change your icon name if you were using an icon name that was mapped to another.
- These changes simplify the icon component as now all icon names are a one-to-one mapping to an svg file.
- These changes should also make it clearer to application teams if the icons they are using are official Spark icons or not.
- The process for adding Official Spark icons has been streamlined and you should contact the UX Design System Team if you require an official replacement for a legacy icon used in your application

#### gux-tabs

- **_Removed Prop_**: The `use-flexbox` prop has been removed. The tabs component now uses flexbox positioning by default.

#### gux-tab-panel

- **_Shadow DOM_**: This component now uses a shadow DOM. We do not expect this change to require any updates in applications. If this change does cause you an issue please reach out to the CORE UI team for help.

#### gux-text-highlight

- **_New Prop_**: A new `dimmed` property has been added to `gux-text-highlight`. This property changes the color used to highlight the text to a lighter one.

#### gux-tooltip

- **_New Prop_**: `accent` property.
  - The accents `light` and `dark` are currently available to use. The default `accent` is `light`.
  ```diff
  + <gux-tooltip accent="light">Tooltip</gux-tooltip>
  + <gux-tooltip accent="dark">Tooltip</gux-tooltip>
  ```
- **_New Prop_**: `anchor` property.
  - The `anchor` property will display an anchor on the tooltip pointing towards the target element.
  ```diff
  + <gux-tooltip anchor>Tooltip</gux-tooltip>
  ```

The default component behavior for `gux-tooltip` remains unchanged. We suggest reading the Spark Design documentation or consulting with your UX contact before using the new properties.

---

_This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR._
