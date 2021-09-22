# V2 -> V3 Migration Guide (Work in progress)

*This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR.*

## TLDR
* remove `first-day-of-week` property from instances of `gux-calendar`
* remove `first-day-of-week` property from instances of `gux-datepicker`
* remove `-beta` from components that have become stable
  * `gux-accordion-beta` ->  `gux-accordion`
* add `-legacy` to components that have been removed from stable
  * `gux-accordion` -> `gux-accordion-legacy`
* migrate away from usage of legacy components
  * `gux-accordion-legacy` -> `gux-accordion`

## Stable Component Changes

### gux-calendar

'first-day-of-week' property removed. This is now determined via locale.

### gux-datepicker

'first-day-of-week' property removed. This is now determined via locale via the `gux-calendar` component.

## New Stable Components Promoted from Beta

The following components have moved from beta to stable without any api changes.

* gux-accordion

#### Actions

* *(required)* remove `-beta` from the tag name of the component

#### V2

```html
<gux-accordion-beta>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
  <gux-accordion-section></gux-accordion-section>
</gux-accordion-beta>
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

[More details here](gux-accordion-legacy)
