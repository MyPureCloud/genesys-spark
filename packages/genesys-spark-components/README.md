# Genesys Spark Monorepo

# Spark Web Components

This repo contains the custom elements that make up the bulk of the
[Spark](https://spark.genesys.com) design system. Developers should prefer using
the [`genesys-spark`](../genesys-spark/README.md) package and avoid importing
this package directly unless there is a specific reason to do so.

## Component Evolution

At any given time there are three types of components present in the library:

- **stable**: Most components fall into this category, and there will be no breaking api changes outside of a major release.
- **beta**: New components where the API design is still being explored. Breaking changes _may_ happen without a major version change.
- **legacy**: Old components that have been replaced by a new component, or a newer version of the component with an incompatible API. These will be removed in the next major release.

For more details on the component evolution process see the full [documentation on the topic](./packages/genesys-spark-components/documentation/COMPONENT_EVOLUTION.md)

## Demo/Documentation

You can find usage examples of all of the components, with an in-browser editor playground
online [here](https://apps.inindca.com/common-ui-docs/#/genesys-webcomponents/latest).

## Installing the library

### Install

`npm install genesys-spark-components`

or

`yarn add genesys-spark-components`

## Setting up your App

### Required Fonts

Spark is designed to work with the Urbanist and Noto Sans fonts. These components
do not provide font loading, so you must include them separately in your project.
For a detailed breakdown of the variants of each font in use, see the typography
section of the [Spark Design Docs](https://spark.genesys.com).

### Stylesheets

The library requires the inclusion of a baseline set of CSS styles that it provides in the package under `dist/genesys-webcomponents/genesys-webcomponents.css` in apps that use the webcomponents. The stylesheet provides:

- Baseline styles for browser elements
- Classes for specific typography patterns
- CSS variables for colors
- CSS variables for spacing
- CSS variables for z-index of "floating" non-flow content like menus, tooltips, popovers, or modals

The best mechanism for importing the stylesheet into your project will depend on how you handle CSS in your project in general. Reach out to the Common UI Development group if you're having trouble with your specific integration.

**Note: Since v3 this baseline stylesheet is required.**

### Genesys Cloud applications

Genesys Cloud applications, or other always-online apps should import the library and call
`registerElements` early during application bootstrap to register the components with the browser.

```javascript
import { registerElements } from 'genesys-spark-components';
registerElements();
```

This will register the custom elements and automatically configure stencil to load icons and
internationalization files from our CDN. You shouldn't need to bundle any additional assets
into your application.

### Localization

You will need to set a lang attribute on the a component or one of its ancestor elements to trigger localization.
Normally, you should set it on the page somewhere at a high level, e.g. `<html lang="en">` or `<body lang="en">`
and the components will localize based on that. If no language is set, the components default to English.

### Framework Integration Notes

- [React](./packages/genesys-spark-components/documentation/REACT_INTEGRATION.md)

## Development and Contribution

The common component library has a small set of developers, who also work on other projects, so
contribution from users is welcome. If you need a new feature, the best way to get it is to work
with the team to implement it yourself. Please reach out to discuss your work _before_ opening a PR.
An early conversation is the best way to avoid duplicated effort.

Also, be sure to read the [Contributing Guidelines](./packages/genesys-spark-components/documentation/CONTRIBUTING.md) before starting development work.

### Serving component and docs

Once you've checked out the project, install the local dependencies and start the dev server.

```sh
npm install
```

```sh
npm run dev
```

then navigate to `http://localhost:8080/` to see the docs

If you want the docs to be accessible externally you can use

```sh
npm run dev.public
```

this will host the docs on `http://0.0.0.0:8080/`.
This means they are available elsewhere on your network at `http:/<your-ip-address>:8080/`.

### Running tests

```sh
npm run test
```

or

```sh
npm run test.watch
```

### Documenting your component

Add an `example.html` file to your component's implementation directory with some examples.

## Notes for external users

Currently this project is primarily use for internal Genesys projects, so most of our issue tracking and planning
is done in internal tools. We do still look at GitHub isssues, but please understand that we're a small team and
may not be able to address items right away, depending on internal priorities.
