# genesys-spark

This package is the default way to use Spark. It provides access to Spark's lazy-loading custom elements via a single shared CDN, as well as utilities for non-rendering UI tasks.

## Installation

Use your package manager of choice to install the package in your project.

`npm install genesys-spark`

### Loading the components

When initializing your app/page, call `registerSparkComponents`, which will inject
the script and style tags into your page that define the main Spark custom elements:

```js
import { registerSparkComponents } from 'genesys-spark';

// It's not _required_ to await component loading, but it can help prevent a flash
// of unstyled content
await registerSparkComponents();
```

## Loading Mechanism

By adding a script tag to the document, we ensure that the components are always
loaded from the same location. This keeps the bundle size of the consuming application
smaller, and ensures that multiple apps on the same domain will share the browser's
cache of the component definitions. Overall, this leads to a better end-user experience.

Additionally, Stencil builds the components so that their full implementations do
not need to be loaded up-front. Instead, components are fetched as they are used
in the page. Those lazy-loaded implementations also benefit from sharing the
browser cache in the same way as the initial script.