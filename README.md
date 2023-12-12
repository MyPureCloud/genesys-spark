<img src="https://studio-assets.supernova.io/design-systems/27408/b8ad8938-c463-41aa-ad30-c659b149b853.png"/>

# Spark Design System

[![Major Version](https://img.shields.io/badge/V4-Flare-orange)](docs/migration-guides/v4/readme.md)
[![NPM latest](https://img.shields.io/npm/v/genesys-spark/latest.svg)](docs/migration-guides/v4/readme.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/MyPureCloud/genesys-spark/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/documentation-8A2BE2)](https://spark.genesys.com?utm_source=github&utm_medium=readme_shield)
[![Figma library](https://img.shields.io/badge/spark_core_components-darkslateblue?logo=figma&logoColor=white)](https://www.figma.com/file/JKbHmcf4nUF6C7Pj8M6MpY)

> ⚠ Visit the [V4 migration guide](docs/migration-guides/v4/readme.md) for details on the new v4 release and migration details.

## Hi there! 👋

- Keep reading for an overview of the Spark packages and links on how to get started installing them!
- For details on component documentation and guidelines, go to [https://spark.genesys.com/](https://spark.genesys.com?utm_source=github&utm_medium=readme_p)
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

## Figma libraries

Currently, all our Figma libraries are only available for Genesys employees only, [You can visit them here.](https://www.figma.com/file/JKbHmcf4nUF6C7Pj8M6MpY)

## Contributing and Local Development

A guide to contributing to the Genesys Spark repository

[Read more...](docs/CONTRIBUTING.md)
