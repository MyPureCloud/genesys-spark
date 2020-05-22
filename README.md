# Genesys Web Components

This repo contains a set of custom elements that can be used across Genesys' UIs to provide a common user experience.

## Updates

If you are a consumer of this library, please subscribe to the "Common UI Development" mailing list to recieve any
important updates about breaking changes or upcoming releases. You can find instructions on how to subscribe to a
new mailing list [here](https://intranet.genesys.com/spaces/viewspace.action?key=IC), under "Self-Service Email
Distribution Groups"

You may also want to join the chat room for the Genesys Cloud [Common UI Development Group](https://apps.mypurecloud.com/directory/#/group/3fd509fa-c20b-4cfe-ab01-f81588d2a510)

## Demo/Documentation

[Lives here](https://apps.inindca.com/common-ui-docs/#/genesys-webcomponents/latest)

## Installing the library

Currently the main line of development is done in the 1.0.0-alpha branch/release. This is because we are working on making
changes to the APIs of some components to bring them up to our [API design standards](COMPONENT_DESIGN.md). The elements
that are currently likely to change are documented by the `likely-breaking-changes` label [in JIRA](<https://inindca.atlassian.net/issues/?jql=project%20%3D%20%22COMUI%22%20AND%20resolution%20%3D%20Unresolved%20AND%20labels%20in%20(likely-breaking-changes)%20ORDER%20BY%20priority%20DESC>).

### Prerequisites

Published artifacts are stored in our private artifactory/jfrog registry, so you will need to update your
[.npmrc](https://docs.npmjs.com/configuring-npm/npmrc.html) file to use artifactory. There are some
[basic instructions](https://confluence.inin.com/display/PureCloud/Setting+up+.npmrc+for+Artifactory) availabe for
this. This registry proxies the main NPM registry, but if you need to also use other private registries some
manual editing of your configuration may be necessary. Please read up on the npmrc docs or ask around in one of
the Genesys Cloud UI chat rooms if you need help with that.

### Install

`npm install -E @genesys/common-webcomponents@alpha`

or

`yarn add -E @genesys/common-webcomponents@alpha`

The `-E` is for exact-version while we are in alpha and breaking changes may still be possible, so you will need to manually upgrade when needed.

## Setting up your App

### Genesys Cloud applications

Genesys Cloud applications, or other always-online apps should import the library and call
`registerElements` early during application bootstrap to register the components with the browser.

```javascript
import { registerElements } from '@genesys/common-webcomponents';
registerElements();
```

This will register the custom elements and automatically configure stencil to load icons and internationalization files from our CDN.
You shouldn't need to bundle any additional assets into your application.

### Premise/Hybrid applications

If your application runs on local networks and needs to work when the general internet is inaccessible, you'll want to directly use
stencil's loader.

```javascript
import { defineCustomElements } from '@genesys/common-webcomponents/loader';
defineCustomElements();
// for optional lazy-loaded custom resource location:
// defineCustomElements(window, { resourcesUrl: 'path/to/deployed/resources' });
```

You'll also need to make sure the contents of `@genesys/common-webcomponents/dist/genesys-webcomponents/` are deployed with your
application so that stencil's lazy-loading can fetch those resources. See the stencil [integration docs](https://stenciljs.com/docs/overview)
for more details.

### IE 11 support

Since IE11 does not support web components natively, you will need to
[apply polyfills](https://stenciljs.com/docs/angular#edge-and-ie11-polyfills) in order to support it.

### Localization

You will need to set a lang attribute on the Gux component or one of its ancestor elements and the Gux component will use that to decide what language to use.
For example you could set it on the page somewhere at a high level, e.g. `<html lang="en">` or `<body lang="en">` and all the Gux components will use that to decide what language to use.

## Development and Contribution

The common component library has a very small set of developers, who also work on other projects, so
contribution from users is welcome. If you need a new feature, the best way to get it is to work
with the team to implement it yourself. You can see the current backlog of tickets in the [COMUI JIRA project](https://inindca.atlassian.net/projects/COMUI).

### Prerequisites

- THIS IS THE MOST IMPORTANT PART: Read the [Contributing Guidelines](./CONTRIBUTING.md) before starting development work.
- [Request access to GenesysCloud Resources](https://confluence.inin.com/display/PureCloud/How+to+Request+Access+to+Genesys+Cloud+Resources) including [Bitbucket](https://bitbucket.org/inindca/)
- Join the chat room for the Genesys Cloud [Common UI Development Group](https://apps.mypurecloud.com/directory/#/group/3fd509fa-c20b-4cfe-ab01-f81588d2a510) and let us know what you're working on!

### Serving component and docs

Once you've checked out the project, this is the easist way to see your component as you work on it.

```sh
npm run dev
```

then navigate to http://localhost:8080 to see the docs

### Running tests

```sh
npm run test
```

or

```sh
npm run test.watch
```

### Documenting your component

To document a component, add an entry under `docs/src/components-spec.json` describing any attributes and events
for your component, and place an `example.html` file in the component directory the demonstrates the use of
the component. Afterward, it will show up in the documentation site.

### Localizing your component

Documentation about localizing components can be found in the
[wiki](https://bitbucket.org/inindca/genesys-webcomponents/wiki/Localization)
