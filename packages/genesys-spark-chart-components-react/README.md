# React Integration

This package generates a set of react wrapper elements which are published in `genesys-spark-chart-components-react` and should be used in favor of directly using the custom elements in a React app.

## Installation

Install `genesys-spark-chart-components-react` with same version as the desired `genesys-spark-chart-components` version. (e.g. `genesys-spark-chart-components-react@X.Y.Z` will install `genesys-spark-chart-components@X.Y.Z`). To avoid version conflicts, remove the direct dependency on `genesys-spark-chart-components` if adding to an existing consumer of the spark components.

## Usage

Native React elements are imported from `genesys-spark-chart-components-react`, the custom elements still need to be registered as before, (e.g. with `registerElements` imported from `genesys-spark-chart-components`).

## Example

```ts
import { registerElements } from 'genesys-spark-chart-components';
import { GuxTODO } from 'genesys-spark-chart-components-react';
registerElements(); // Realistically this would probably be in something like index.tsx

const MyReactComponent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <GuxButton onClick={() => setCounter(x => x + 1)}>
      You have clicked {counter} times
    </GuxButton>
  );
};
```

## Events

If a stencil component defines an event called `eventname`, then the React wrapper element will have a corresponding `onEventname` prop. For example, `<GuxModal>` has `onGuxdismiss` corresponding to the `guxdismiss` event from `<gux-modal>`.
