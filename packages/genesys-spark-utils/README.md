# genesys-spark-utils

Shared utilities for Genesys Spark packages.

## Overview

This package contains utility functions that are shared between `genesys-spark` and `genesys-spark-components` packages to eliminate code duplication.

## Utilities

- `getClosestElement` - Utility to get the closest element passing shadow DOM boundaries
- `sparkIntl` - Internationalization utilities for date/time formatting and locale detection

## Usage

```typescript
import { getClosestElement } from 'genesys-spark-utils';
```

```typescript
import { sparkIntl } from 'genesys-spark-utils';
```

## Development

This package is part of the Genesys Spark monorepo and is not intended to be used standalone.
