# Component Evolution

This document describes a mechanism for handling breaking changes to components (API or design
changes) in a way that supports gradual adoption by development teams. We also want to limit how
often teams have to deal with breaking changes to a fairly regular and infrequent cadence.

## Beta, Supported, Legacy Cycle

The mechanism for handling these transitions will be for breaking changes in components to go through
a series of states:

- Beta: Beta components are available in the library for early adopters, but subject to breaking
  change without a major version bump, most likely based on feedback from the teams using it.

- Supported: This is the normal component version, the default approach teams should use. No breaking
  changes outside of a major package version bump. Most components should be in this state most of the
  time.

- Legacy: Legacy components let teams defer handling significant breaking API changes in a
  component for a reasonable amount of time after a major version change. There will be some work
  required to stay on a legacy version, but it should be simple and quick.

This cycle is implemented on a per-component basis by adding a `-beta` or `-legacy` suffix to
the component element names for the respective states.

## Migrations

On a major release all component state changes will be documented and presented in an easy to follow migration guide.

### beta → supported

If the application is using the latest beta version of the component there will be no need for code
changes other than removing the `-beta` suffix. If the beta version is out of date there may be a
need for some development work as the components api may have changed. A component will not move to
the supported state unless it is well documented so this migration should be straight-forward.

### supported → legacy

There will be no need for code changes other than adding the `-legacy` suffix. At this stage the
development team should start planning to move to the supported version before the next major release.

### legacy → supported

When a component version is deprecating a migration guide will be created to help development teams
move to the newly supported component.

## Rotation Schedule

Components will rotate through the beta/supported/legacy cycle on roughly a quarterly basis.
Once a quarter, any beta components implementations that are sufficiently stable will become
supported components. The previously supported version of that component will become legacy,
and any previously legacy components will be removed from the library entirely.

For a team that does not want to migrate right away to the new APIs, staying on the legacy
version of a component should just involve a straighforward find-and-replace to add `-legacy` to
the components. Those teams can then move to the new API anytime in the next quarter before the
legacy components are removed.

## FAQ

Q: Does this mean I'll have to upgrade a bunch of components every three months?
A: No, the overall goal is always to have as few breaking changes as possible. We expect to
eventually reach a point where we go entire quarters without any breaking changes at all.

More to be added when people ask questions...
