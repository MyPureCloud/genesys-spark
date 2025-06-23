# Genesys Spark Utils

A collection of utility functions for Genesys Spark components.

## Installation

```bash
npm install genesys-spark-utils
```

## Usage

### Internationalization Utilities

```typescript
import {
  dateTimeFormat,
  determineDisplayLocale,
  getFormat
} from 'genesys-spark-utils';

// Create a date formatter with automatic locale detection
const formatter = dateTimeFormat();
const formattedDate = formatter.format(new Date());

// Determine the display locale from DOM or browser
const locale = determineDisplayLocale();

// Get date format string for a locale
const format = getFormat('en-US'); // Returns 'mm/dd/yyyy'
```

### DOM Utilities

```typescript
import { getClosestElement } from 'genesys-spark-utils';

// Find the closest element with a specific selector, crossing shadow DOM boundaries
const element = getClosestElement(targetElement, '[lang]');
```

## API Reference

### `dateTimeFormat(localeOrOptions?, options?)`

Creates an `Intl.DateTimeFormat` instance with automatic locale detection.

### `determineDisplayLocale(element?)`

Determines the appropriate locale for display, checking DOM language attributes and falling back to browser preferences.

### `getFormat(locale)`

Returns a date format string for the specified locale.

### `getClosestElement(baseElement, selector)`

Finds the closest ancestor element matching the selector, crossing shadow DOM boundaries.

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test.unit.watch

# Lint code
npm run eslint
```
