# Migration Guide

*This migration guide is open to anyone to edit. If you have migrated your icons and think it would be helpful to others to document
something you encountered please do so. We understand that at the moment because of the need to fork the repo the overhead of making a small
contribution is high so feel free to raise an issue on the COMUI board instead it that is more convenient and a core team member will
create the PR.*

## Icon Updates and Consolidation

The Design System Team carried out a review of the icons used in Genesys products and those available via `gux-icon`. The outcome of this
review was the creation of a set of Spark Icons. This set is considerable smaller in size than was available via `gux-icon`. To account for
this difference there was an effort to automatically map legacy icons to Spark ones. This was in an effort to minimise the effort needed to
migrate to the new Spark Icons.

## Mapping of Legacy Icons to Spark Icons

* Some Spark icons are new.
  * There is no work needed to migrate these icons.
* Some Spark icons have identical names to their legacy equivalents.
  * There is no work needed to migrate these icons.
* Some Spark icons have legacy equivalents with different names.
  * Using the legacy icon name in `gux-icon` will automatically use the appropriate Spark Icon but please migrate to the Spark Icon name.
* Some Legacy icons have no Spark Icon equivalent.
  * These icons will still be displayed by `gux-icon`. If you use an icon that has no equivalent Spark Icon please contact the Design System
    Team and they will work with you to get it added to the icon set. For tracking reasons you should also update the icon name to have a
    `legacy/` prefix (`icon-name="bandage"` -> `icon-name="legacy/bandage"`)
