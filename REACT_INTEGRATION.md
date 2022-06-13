# React Integration

This package generates a set of react wrapper elements which are published in `genesys-spark-components-react` and should be used in favor of directly using the custom elements in a React app.

The react package should be installed alongside `genesys-spark-components`, with matching version numbers, and the web-components will still need to be registered (e.g. via `registerElements()`)

## Example

```ts
import { registerElements } from 'genesys-spark-components';
import { GuxButton } from 'genesys-spark-components-react';
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
