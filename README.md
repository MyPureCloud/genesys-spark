# Genesys Web Components

## Prerequisites

- Get access to PureCloud Resources including Bitbucket (https://bitbucket.org/inindca/)
https://confluence.inin.com/pages/viewpage.action?title=PureCloud+Dev+-+New+Hire&spaceKey=PureCloud

- Setting up .npmrc for Artifactory
https://confluence.inin.com/display/PureCloud/Setting+up+.npmrc+for+Artifactory

- Add generated .npmrc to your project root or in the home directory `~`
> If you still need to use packages from npm global repository you should add the following line to the top of your generated .npmrc file in a separate line which will make your file look like the following
```yaml
registry=https://registry.npmjs.org/
//purecloud.jfrog.io/purecloud/api/npm/inin-internal-npm/
...
```

## Install Genesys WebComponents

```
npm install @genesys/common-webcomponents
or
yarn add @genesys/common-webcomponents
```

- See installation instructions for different web application frameworks here:
https://stenciljs.com/docs/overview


- Import Genesys icons (Optional)
```javascript
import '@genesys/common-webcomponents/dist/icons/icons.css';
```

## Basic Components

* [Button](./src/components/global/gux-button/)
* [Rating](./src/components/global/gux-rating/)
* [Toggle](./src/components/global/gux-toggle/)

## Live Demo
https://apps.inindca.com/common-ui-docs/genesys-webcomponents/

## Development

Please read the [Contributing Guidelines](./CONTRIBUTING.md) before starting development work.

### Localizing your component

Documentation about localizing components can be found in the
[wiki](https://bitbucket.org/inindca/genesys-webcomponents/wiki/Localization)

## Build

```sh
npm run build
```

### Create a new component

```sh
npm run create-component
```

### Serve component and storybook

```sh
npm run dev
```


