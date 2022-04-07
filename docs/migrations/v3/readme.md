# V2 -> V3 Migration Guide (Work in progress)

*This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR.*

## TLDR
* Typescript updated to v4
* Set the `allowSyntheticDefaultImports` (or `esModuleInterop`) compiler option  to `true` in the host apps tsconfig.json.
* rename `title` property to `gux-title` on instances of `gux-button`
* replace the `focusElement` method with the `focus` method on instances of `gux-button`
* remove `first-day-of-week` property from instances of `gux-calendar`
* remove `first-day-of-week` property from instances of `gux-datepicker`
* `label` property on instances of `gux-datepicker` now only accepts `string`.
* `trap-focus` property on instances of `gux-modal` now default to true
* replace `gux-list-divider` with `gux-action-list-divider` in `gux-action-button` and `gux-button-multi` components
* remove `-beta` from components that have become stable
  * `gux-accordion-beta` ->  `gux-accordion`
  * `gux-dismiss-button-beta` ->  `gux-dismiss-button`
  * `gux-pagination-cursor-beta` ->  `gux-pagination-cursor`
  * `gux-popup-beta` ->  `gux-popup`
  * `gux-tabs-beta` -> `gux-tabs`
  * `gux-tooltip-title-beta` ->  `gux-tooltip-title`
* add `-legacy` to components that have been removed from stable
  * `gux-accordion` -> `gux-accordion-legacy`
  * `gux-tabs`-> `gux-tabs-legacy`
    * `gux-tab-dropdown-option`-> `gux-tab-dropdown-option-legacy`
    * `gux-tab`-> `gux-tab-legacy`
* change `-beta` to `-legacy` for components that have been removed from beta
  * `gux-command-palette-beta` -> `gux-command-palette-legacy`
  * `gux-panel-frame-beta` -> `gux-panel-frame-legacy`
  * `gux-side-panel-beta` -> `gux-side-panel-legacy`
* migrate away from usage of legacy components
  * `gux-accordion-legacy` -> `gux-accordion`
  * `gux-command-palette-legacy` -> Contact the Core UI team if you need help migrating away from this component.
  * `gux-panel-frame-legacy` -> Contact the Core UI team if you need help migrating away from this component.
  * `gux-side-panel-legacy` -> Contact the Core UI team if you need help migrating away from this component.
  * `gux-tabs-legacy` -> `gux-tabs-advanced` or `gux-tabs`
  * `gux-text-label-legacy` -> Contact the Core UI team if you need help migrating away from this component.

## Configuration
Set the `allowSyntheticDefaultImports` compiler option  to "true" in your host apps tsconfig.json. Omitting this option will cause build errors in your app.
This new requirement is related to the a new dependency (vega-lite) which was added as part of our visualisation work.
(`allowSyntheticDefaultImports: true` is implied by `esModuleInterop: true`, so if the `esModuleInterop` is already enabled, `allowSyntheticDefaultImports` does not need to be explicitly added)

## Stable Component Changes

### gux-button

  * 'title' property renamed `gux-title`. This is to fix an accessibility defect.
  * The `focusElement` method has been removed. Use the `focus` method instead. The migration to Shadow DOM made it possible to use the `focus` method, so the `focusElement` method is no longer necessary.

### gux-calendar

  * 'first-day-of-week' property removed. This is now determined via locale.

### gux-datepicker

  * 'first-day-of-week' property removed. This is now determined via locale via the `gux-calendar` component.
  * `label` property on instances of `gux-datepicker` now only accepts `string`. For range labels use a comma seperate list.

#### V3

```html
<gux-datepicker mode="range" label="Start,End"></gux-datepicker>
```

### gux-modal

  * 'trap-focus' property now defaults to true.

#### V2

```html
<gux-modal id="example-1"> ... </gux-modal>
<gux-modal id="example-2" trap-focus> ... </gux-modal>
<gux-modal id="example-3" trap-focus="true"> ... </gux-modal>
<gux-modal id="example-4" trap-focus="false"> ... </gux-modal>
```

#### V3

```html
<gux-modal id="example-1" trap-focus="false"> ... </gux-modal>
<gux-modal id="example-2"> ... </gux-modal>
<gux-modal id="example-3" trap-focus="true"> ... </gux-modal>
<gux-modal id="example-4" trap-focus="false"> ... </gux-modal>
```

## New Stable Components Promoted from Beta

The following components have moved from beta to stable without any api changes.

* gux-accordion
* gux-dismiss-button
* gux-pagination-cursor
* gux-popup
* gux-tabs (v3)
* gux-tooltip-title

#### Actions

* *(required)* remove `-beta` from the tag name of the component

#### V2

```html
<gux-accordion>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
</gux-accordion>
```

#### V3

```html
<gux-accordion>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
</gux-accordion>
```

## New Legacy Components Archived from Stable

The following components have moved from stable to legacy without any api changes.

* gux-accordion
* gux-tabs (v2)

#### Actions

* *(required)* add `-legacy` to the tag name of the component

#### V2

```html
<gux-accordion></gux-accordion>
```

#### V3

```html
<gux-accordion-legacy></gux-accordion-legacy>
```

* *(required)* migrate away from usage of legacy components. The basic migration of adding `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released.

## Legacy Component Migration Information

### gux-accordion-legacy

[More details here](./gux-accordion-legacy)

### gux-command-palette-legacy

Contact the Core UI team if you need help migrating away from this component.

### gux-panel-frame-legacy

Contact the Core UI team if you need help migrating away from this component.

### gux-side-panel-legacy

Contact the Core UI team if you need help migrating away from this component.

### gux-tabs-legacy (and gux-tab-legacy and gux-tab-dropdown-option-legacy)

[More details here](./gux-tabs-legacy)

### gux-text-label-legacy

Contact the Core UI team if you need help migrating away from this component.
