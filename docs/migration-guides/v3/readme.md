# V3 Migration Guide

_This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR._

## Breaking changes at a glance

- New package name on public NPM: `genesys-spark-components`
- Typescript updated to v4
- Set the `allowSyntheticDefaultImports` (or `esModuleInterop`) compiler option to `true` in the host apps tsconfig.json (See [configuration](#configuration))
- The stylesheet provided by the library is now mandatory (See [configuration](#configuration)).
- Components now use a Shadow DOM to encapsulate their DOM and CSS implementation (See [Encapsulation](#Encapsulation)).
- remove `-beta` from components that have been [promoted to stable](#v2-beta-components-promoted-to-stable-in-v3)
- add `-legacy` to components that have been [removed from stable](#v2-stable-components-archived-to-legacy-in-v3)
- change `-beta` to `-legacy` for components that have been [removed from beta](#v2-beta-components-archived-to-legacy-in-v3)
- implement a new solution for components[removed from v3](#v2-beta-components-removed-from-v3)
- migrate away from usage of legacy components
- [Stable component changes](#stable-component-changes):
  - rename `title` property to `gux-title` on instances of `gux-button`
  - replace the `focusElement` method with the `focus` method on instances of `gux-button`
  - remove `first-day-of-week` property from instances of `gux-calendar`
  - remove `first-day-of-week` property from instances of `gux-datepicker`
  - `label` property on instances of `gux-datepicker` now only accepts `string`.
  - `trap-focus` property on instances of `gux-modal` now default to true
- remove the `icon` property from `gux-tag-beta` and slot in the icon instead

## Move to the new public NPM package

`npm uninstall @genesys/common-webcomponents`

`npm install genesys-spark-components`

or

`yarn remove @genesys/common-webcomponents`

`yarn add genesys-spark-components`

## Configuration

- Set the `allowSyntheticDefaultImports` compiler option to "true" in your host apps tsconfig.json. Omitting this option will cause build errors in your app.
  This new requirement is related to the a new dependency (vega-lite) which was added as part of our visualization work.
  (`allowSyntheticDefaultImports: true` is implied by `esModuleInterop: true`, so if the `esModuleInterop` is already enabled, `allowSyntheticDefaultImports` does not need to be explicitly added)
- The stylesheet provided by the library is now mandatory. The library provides a baseline set of CSS styles in this stylesheet in the package under `dist/genesys-webcomponents/genesys-webcomponents.css`. In previous versions the inclusion of this stylesheet was strongly recommended but now due to limitation in css selectors for slotted elements the stylesheet is mandatory.

## V2 Beta Components Promoted to Stable in V3

Action: _(required)_ remove `-beta` from the tag name of the component.

```diff
- <gux-accordion-beta>
+ <gux-accordion>
  ...
- </gux-accordion-beta>
+ </gux-accordion>
```

There have been no API changes in these components.

| V2 tag name                   | V3 tag name              |
| ----------------------------- | ------------------------ |
| gux-accordion-beta            | gux-accordion            |
| gux-dismiss-button-beta       | gux-dismiss-button       |
| gux-dropdown-v2-beta          | gux-dropdown             |
| gux-form-field-checkbox-beta  | gux-form-field-checkbox  |
| gux-form-field-color-beta     | gux-form-field-color     |
| gux-form-field-number-beta    | gux-form-field-number    |
| gux-form-field-radio-beta     | gux-form-field-radio     |
| gux-form-field-range-beta     | gux-form-field-range     |
| gux-form-field-search-beta    | gux-form-field-search    |
| gux-form-field-select-beta    | gux-form-field-select    |
| gux-form-field-text-like-beta | gux-form-field-text-like |
| gux-form-field-textarea-beta  | gux-form-field-textarea  |
| gux-pagination-cursor-beta    | gux-pagination-cursor    |
| gux-popup-beta                | gux-popup                |
| gux-tabs-beta                 | gux-tabs                 |

## V2 Stable Components Archived to Legacy in V3

| V2 tag name       | V3 tag name              | V3 stable equivalent (requires API changes) | Migration Guide                       |
| ----------------- | ------------------------ | ------------------------------------------- | ------------------------------------- |
| gux-accordion     | gux-accordion-legacy     | gux-accordion                               | [link](./gux-accordion-legacy.md)     |
| gux-action-button | gux-action-button-legacy | gux-action-button                           | [link](./gux-action-button-legacy.md) |
| gux-action-list   | gux-action-list-legacy   | gux-list                                    | [link](./gux-list-legacy.md)          |
| gux-button-multi  | gux-button-multi-legacy  | gux-button-multi                            | [link](./gux-button-multi-legacy.md)  |
| gux-dropdown      | gux-dropdown-legacy      | gux-dropdown                                | [link](./gux-dropdown-legacy.md)      |
| gux-list          | gux-list-legacy          | gux-list                                    | [link](./gux-list-legacy.md)          |
| gux-tabs          | gux-tabs-advanced        | gux-tabs, gux-tabs-advanced                 | [link](./gux-tabs-legacy.md)          |
| gux-form-field    | gux-form-field-legacy    | gux-form-field-{type}                       | [link](./gux-form-field-legacy.md)    |
| gux-text-label    | gux-text-label-legacy    | gux-form-field-{type}                       | [link](./gux-form-field-legacy.md)    |

Action: _(required)_ add `-legacy` to the tag name of the component.

```diff
- <gux-accordion heading-level="2" arrow-position="beside-text">
+ <gux-accordion-legacy heading-level="2" arrow-position="beside-text">
  ...
- </gux-accordion>
+ </gux-accordion-legacy>
```

If possible, avoid the usage of legacy components and do a full migration to a stable component. The basic migration of adding `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released.

## V2 Beta Components Archived to Legacy in V3

| V2 tag name              | V3 tag name                |
| ------------------------ | -------------------------- |
| gux-command-palette-beta | gux-command-palette-legacy |
| gux-panel-frame-beta     | gux-action-button-legacy   |
| gux-side-panel-beta      | gux-side-panel-legacy      |

Action: _(required)_ remove the `-beta` tag and add `-legacy` to the tag name of the component.

```diff
- <gux-command-palette-beta>
+ <gux-command-palette-legacy>
  ...
- </gux-command-palette-beta>
+ </gux-command-palette-legacy>
```

If possible, avoid the usage of legacy components and do a full migration to a stable component. The basic migration of replacing the `-beta` suffix with `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released. Contact the Core UI team if you need help migrating away from these components.

## V2 Beta Components Removed from V3

### gux-search-beta

Action: _(required)_ implement a new solution for your use case.

There is no universal migration path away from this component. We expect `gux-form-field-search` to be sufficient for most use cases but that may still require your application to implement additional functionality that was previously provided by the component.

## Stable Component Changes

### gux-button

- `title` property was named to `gux-title`
  - This change was made to address an accessibility defect

  ```diff
  - <gux-button title="default" onclick="notify(event)">Default</gux-button>
  + <gux-button gux-title="default" onclick="notify(event)">Default</gux-button>
  ```

- `focusElement` method has been removed. Use the `focus` method instead.
  - The migration to ShadowDOM has made it possible to use the `focus` method. The `focusElement` method is no longer necessary.

### gux-calendar

- `first-day-of-week` property was removed
  - First day of week is now determined via locale

### gux-datepicker

- `first-day-of-week` property was removed
  - First day of week is now determined via locale within the `gux-datepicker`'s internal `gux-calendar` component
- `label` property on instances of `gux-datepicker` now only accept a string. For range labels use a comma separated list.

  ```html
  <gux-datepicker mode="range" label="Start,End"></gux-datepicker>
  ```

### gux-modal

- `trap-focus` property now defaults to `true`
  - For accessibility reasons, modals should have trap focus enabled by default
  ```diff
  - <gux-modal id="example-1"> ... </gux-modal>
  + <gux-modal id="example-1" trap-focus="false"> ... </gux-modal>
  - <gux-modal id="example-2" trap-focus> ... </gux-modal>
  + <gux-modal id="example-2"> ... </gux-modal>
  - <gux-modal id="example-3" trap-focus="true"> ... </gux-modal>
  + <gux-modal id="example-3" trap-focus="true"> ... </gux-modal>
  - <gux-modal id="example-4" trap-focus="false"> ... </gux-modal>
  + <gux-modal id="example-4" trap-focus="false"> ... </gux-modal>
  ```

## v3 Improvements

### Accessibility

Improving accessibility in the components was a major focus for v3. We identified and prioritized accessibility violations and made breaking API changes in some of the components only as needed for this release. In future minor releases, the components will continue to receive accessibility updates and improvements without breaking changes.

New stable components have been added that provide major accessibility improvements over legacy components:

- gux-accordion
- gux-action-button
- gux-button-multi
- gux-dropdown
- gux-form-field
- gux-list

We have added automated and manual testing processes to identify existing issues and prevent regressions. See the [Building and Testing Components with Accessibility in Mind](https://github.com/MyPureCloud/genesys-webcomponents/blob/main/packages/genesys-spark-components/documentation/A11Y_TESTING.md) documentation to read more about how we test accessibility in our components.

### Encapsulation

Migrating our webcomponents to use a Shadow DOM was another major focus for v3. A Shadow DOM allows the webcomponent to compartmentalize its DOM and CSS implementation details away from web apps that uses it. We believe that this compartmentalization will reduce the number of bugs where the webcomponents were unexpectedly interacting with the DOM and CSS of the host web app. This type of bug while often subtle would lead to a very bad developer experience where a small change (often only a patch semver change) to the internal implementation of a webcomponent would break a host apps UI. We believe with more encapsulation we can give more confidence to developers that upgrading your version of the webcomponents will not be a large development effort.

We are aware that there are some teams who were leveraging the fact that webcomponents were not using a Shadow DOM for encapsulation to modify the styling of webcomponents. This practice was discouraged because we can only guarantee that the public API of the components stays consistent, not the internal implementation details. Please reach out to the Core UI team if you feel your migration to v3 of the webcomponents is blocked by this new encapsulation and we will work with you to support your use case via the components' public API.

### New components

- gux-visualization
  - chart-column
  - chart-donut
  - chart-line
  - chart-pie
- gux-badge
- gux-card
- gux-tabs-advanced
