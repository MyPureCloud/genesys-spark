# V4 Migration Guide

_This migration guide is open to anyone to edit. If you have migrated a component and think it would be helpful to others to document something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will create the PR._

## Breaking changes at a glance

- Typescript updated to v5
- remove `-beta` from components that have been [promoted to stable](#v3-beta-components-promoted-to-stable-in-v4)
- add `-legacy` to components that have been [removed from stable](#v3-stable-components-archived-to-legacy-in-v4)
- change `-beta` to `-legacy` for components that have been [removed from beta](#v3-beta-components-archived-to-legacy-in-v4)
- implement a new solution for components[removed from v3](#v3-beta-components-removed-from-v4)
- migrate away from usage of legacy components
- [Stable component changes](#stable-component-changes):
  - TODO

## V3 Beta Components Promoted to Stable in V4

Action: _(required)_ remove `-beta` from the tag name of the component.

```diff
- <gux-example-beta>
+ <gux-example>
  ...
- </gux-example-beta>
+ </gux-example>
```

There have been no API changes in these components.

| V3 tag name      | V4 tag name |
| ---------------- | ----------- |
| gux-example-beta | gux-example |

## V3 Stable Components Archived to Legacy in V4

| V3 tag name | V4 tag name        | V4 stable equivalent (requires API changes) | Migration Guide                 |
| ----------- | ------------------ | ------------------------------------------- | ------------------------------- |
| gux-example | gux-example-legacy | gux-example                                 | [link](./gux-example-legacy.md) |

Action: _(required)_ add `-legacy` to the tag name of the component.

```diff
- <gux-example>
+ <gux-example-legacy>
  ...
- </gux-example>
+ </gux-example-legacy>
```

If possible, avoid the usage of legacy components and do a full migration to a stable component. The basic migration of adding `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released.

## V3 Beta Components Archived to Legacy in V4

| V3 tag name      | V4 tag name        |
| ---------------- | ------------------ |
| gux-example-beta | gux-example-legacy |

Action: _(required)_ remove the `-beta` tag and add `-legacy` to the tag name of the component.

```diff
- <gux-example-beta>
+ <gux-example-legacy>
  ...
- </gux-example-beta>
+ </gux-example-legacy>
```

If possible, avoid the usage of legacy components and do a full migration to a stable component. The basic migration of replacing the `-beta` suffix with `-legacy` will have to be followed up with a full migration to a stable component before the next major version is released. Contact the Core UI team if you need help migrating away from these components.

## Stable Component Changes

### gux-example
