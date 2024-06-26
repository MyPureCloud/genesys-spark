<img src="https://studio-assets.supernova.io/design-systems/27408/7754f040-a504-4d00-8165-ac8657c885a4.png"/>

# Spark Design System

[![Major Version](https://img.shields.io/badge/V4-Flare-orange)](docs/migration-guides/v4/readme.md)
[![NPM latest](https://img.shields.io/npm/v/genesys-spark/latest.svg)](docs/migration-guides/v4/readme.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/MyPureCloud/genesys-spark/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/documentation-8A2BE2)](https://spark.genesys.com?utm_source=github&utm_medium=readme_shield)
[![Figma library](https://img.shields.io/badge/spark_core_components-darkslateblue?logo=figma&logoColor=white)](https://www.figma.com/file/JKbHmcf4nUF6C7Pj8M6MpY)

> ⚠ Visit the [V4 migration guide](docs/migration-guides/v4/readme.md) for details on the new v4 release and migration details.

## Hi there! 👋

- Keep reading for an overview of the Spark packages and links on how to get started installing them!
- To see usage examples of the components with an in-browser editor visit the [component playground!](https://apps.inindca.com/common-ui-docs/#/genesys-webcomponents/latest)
- For details on UX component documentation and guidelines, go to [https://spark.genesys.com/](https://spark.genesys.com?utm_source=github&utm_medium=readme_p)
- If you want to contribute to the codebase, check out the [contributing guide!](docs/CONTRIBUTING.md)

## Spark Packages

This project contains several packages that make up Genesys' design system, Spark.

### genesys-spark

A wrapper package that serves as the default entry-point for using the design system. It provides access to [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) loaded from a shared CDN and utilities for common UI related tasks (e.g. localization & formatting). For most use cases, this will be the only package you need.

[Read more...](packages/genesys-spark/README.md)

### genesys-spark-components

A collection of [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and associated styles that provides a nice library of UI widgets.

[Read more...](packages/genesys-spark-components/README.md)

### genesys-spark-visualizations

A collection of [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) focused on charts and data visualization.

[Read more...](packages/genesys-spark-visualizations/README.md)

### genesys-spark-components-react

Specialized React bindings for genesys-spark-components. React doesn't always play nice with vanilla custom elements, but these bindings can help.

[Read more...](packages/genesys-spark-components-react/README.md)

### genesys-spark-tokens

The set of [design tokens](https://spark.genesys.com/latest/design-tokens/overview-fVPAMeaU#section-what-are-design-tokens-af) that the Spark components and styles are built on. This is an internal package
that is only used to organize development and is not published.

[Read more...](packages/genesys-spark-tokens/README.md)

## Contributing and Local Development

A guide to contributing to the Genesys Spark repository

[Read more...](docs/CONTRIBUTING.md)

npm install prettier@latest
npm install prettier@latest --workspace=packages/genesys-spark-tokens
npm install prettier@latest --workspace=packages/genesys-spark-components
npm install prettier@latest --workspace=packages/genesys-spark-chart-components
npm install prettier@latest --workspace=packages/genesys-spark-components-react
npm install prettier@latest --workspace=packages/genesys-spark-components-react
npm install prettier@latest --workspace=shared-configs/eslint-config-genesys-spark-components
npm install prettier@latest --workspace=shared-configs/prettier-config-genesys-spark-components
npm install prettier@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install prettier@latest --workspace=web-apps/genesys-spark-examples

npm install marked@12.0.2 --workspace=packages/genesys-spark-components
npm install marked@12.0.2 --workspace=packages/genesys-spark-chart-components

npm install lint-staged@latest --workspace=packages/genesys-spark-tokens
npm install lint-staged@latest
npm install lint-staged@latest --workspace=packages/genesys-spark-components
npm install lint-staged@latest --workspace=packages/genesys-spark-chart-components
npm install lint-staged@latest --workspace=packages/genesys-spark-chart-components-react
npm install lint-staged@latest --workspace=packages/genesys-spark-components-react
npm install lint-staged@latest --workspace=shared-configs/eslint-config-genesys-spark-components
npm install lint-staged@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install lint-staged@latest --workspace=shared-configs/prettier-config-genesys-spark-components
npm install lint-staged@latest --workspace=web-apps/genesys-spark-examples
npm install postcss-html@latest --workspace=packages/genesys-spark-components
npm install postcss-html@latest --workspace=packages/genesys-spark-chart-components
npm install postcss-html@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install postcss-html@latest --workspace=web-apps/genesys-spark-examples
npm install prettier@latest
npm install prettier@latest --workspace=packages/genesys-spark-tokens
npm install prettier@latest --workspace=packages/genesys-spark-components
npm install prettier@latest --workspace=packages/genesys-spark-chart-components
npm install prettier@latest --workspace=packages/genesys-spark-chart-components-react
npm install prettier@latest --workspace=packages/genesys-spark-components-react
npm install prettier@latest --workspace=shared-configs/eslint-config-genesys-spark-components
npm install prettier@latest --workspace=shared-configs/prettier-config-genesys-spark-components
npm install prettier@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install prettier@latest --workspace=web-apps/genesys-spark-examples
npm install rollup@latest
npm install rollup-plugin-dts@latest
npm install sass@latest
npm install sass@latest --workspace=web-apps/genesys-spark-examples
npm install sass-loader@latest --workspace=web-apps/genesys-spark-examples
npm install semver@latest --workspace=web-apps/genesys-spark-examples
npm install stylelint@latest
npm install stylelint@latest --workspace=packages/genesys-spark-components
npm install stylelint@latest --workspace=packages/genesys-spark-chart-components
npm install stylelint@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install stylelint@latest --workspace=web-apps/genesys-spark-examples
npm install stylelint-config-recess-order@latest
npm install stylelint-config-recess-order@latest --workspace=packages/genesys-spark
npm install stylelint-config-recess-order@latest --workspace=packages/genesys-spark-components
npm install stylelint-config-recess-order@latest --workspace=packages/genesys-spark-chart-components
npm install stylelint-config-recess-order@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install stylelint-config-recess-order@latest --workspace=web-apps/genesys-spark-examples
npm install stylelint-config-standard@latest
npm install stylelint-config-standard@latest --workspace=packages/genesys-spark-components
npm install stylelint-config-standard@latest --workspace=packages/genesys-spark-chart-components
npm install stylelint-config-standard@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install stylelint-config-standard@latest --workspace=web-apps/genesys-spark-examples
npm install stylelint-scss@latest
npm install stylelint-scss@latest --workspace=packages/genesys-spark-components
npm install stylelint-scss@latest --workspace=packages/genesys-spark-chart-components
npm install stylelint-scss@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install stylelint-scss@latest --workspace=web-apps/genesys-spark-examples
npm install svgo@latest --workspace=packages/genesys-spark-components
npm install ts-jest@latest
npm install webpack@latest --workspace=web-apps/genesys-spark-examples
npm install webpack-dev-server@latest --workspace=web-apps/genesys-spark-examples

npm install @typescript-eslint/eslint-plugin@latest --workspace=packages/genesys-spark-tokens
npm install @typescript-eslint/eslint-plugin@latest
npm install @typescript-eslint/eslint-plugin@latest --workspace=packages/genesys-spark-components
npm install @typescript-eslint/eslint-plugin@latest --workspace=packages/genesys-spark-chart-components
npm install @typescript-eslint/eslint-plugin@latest --workspace=packages/genesys-spark-chart-components-react
npm install @typescript-eslint/eslint-plugin@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install @typescript-eslint/eslint-plugin@latest --workspace=shared-configs/eslint-config-genesys-spark-components
npm install @typescript-eslint/eslint-plugin@latest --workspace=shared-configs/prettier-config-genesys-spark-components
npm install @typescript-eslint/eslint-plugin@latest --workspace=packages/genesys-spark-components-react
npm install @typescript-eslint/eslint-plugin@latest --workspace=web-apps/genesys-spark-examples
npm install @typescript-eslint/parser@latest --workspace=packages/genesys-spark-tokens
npm install @typescript-eslint/parser@latest
npm install @typescript-eslint/parser@latest --workspace=packages/genesys-spark-components
npm install @typescript-eslint/parser@latest --workspace=packages/genesys-spark-chart-components
npm install @typescript-eslint/parser@latest --workspace=packages/genesys-spark-chart-components-react
npm install @typescript-eslint/parser@latest --workspace=packages/genesys-spark-components-react
npm install @typescript-eslint/parser@latest --workspace=shared-configs/eslint-config-genesys-spark-components
npm install @typescript-eslint/parser@latest --workspace=shared-configs/prettier-config-genesys-spark-components
npm install @typescript-eslint/parser@latest --workspace=shared-configs/stylelint-config-genesys-spark-components
npm install @typescript-eslint/parser@latest --workspace=web-apps/genesys-spark-examples

npm install @types/react@17.0.80 --workspace=packages/genesys-spark-chart-components-react
npm install @types/react@17.0.80 --workspace=packages/genesys-spark-components-react
npm install @types/react-dom@17.0.25 --workspace=packages/genesys-spark-chart-components-react
npm install @types/react-dom@17.0.25 --workspace=packages/genesys-spark-components-react
npm install css-loader@6.11.0 --workspace=web-apps/genesys-spark-examples

npm install @babel/core@latest --workspace=packages/genesys-spark-components
npm install @babel/core@latest --workspace=packages/genesys-spark-chart-components
npm install @babel/core@latest --workspace=web-apps/genesys-spark-examples
npm install @babel/preset-env@latest --workspace=packages/genesys-spark-components
npm install @babel/preset-env@latest --workspace=packages/genesys-spark-chart-components
npm install @babel/preset-env@latest --workspace=web-apps/genesys-spark-examples
npm install @commitlint/cli@latest --workspace=packages/genesys-spark
npm install @commitlint/config-conventional@latest --workspace=packages/genesys-spark
npm install @rollup/plugin-replace@latest --workspace=packages/genesys-spark
npm install @stencil/sass@latest --workspace=packages/genesys-spark-components
npm install @stencil/sass@latest --workspace=packages/genesys-spark-chart-components
npm install @tsconfig/strictest@latest --workspace=packages/genesys-spark
npm install axe-core@latest --workspace=packages/genesys-spark-components
npm install axe-core@latest --workspace=packages/genesys-spark-chart-components

npm install inquirer@latest --workspace=packages/genesys-spark-components
npm install inquirer@latest --workspace=packages/genesys-spark-chart-components

npm install glob@latest --workspace=packages/genesys-spark-tokens
npm install glob@latest --workspace=packages/genesys-spark
npm install glob@latest --workspace=packages/genesys-spark-components
npm install glob@latest --workspace=packages/genesys-spark-chart-components
npm install glob@latest --workspace=web-apps/genesys-spark-examples

npm install @stencil/core@latest --workspace=packages/genesys-spark-components
npm install @stencil/core@latest --workspace=packages/genesys-spark-chart-components
