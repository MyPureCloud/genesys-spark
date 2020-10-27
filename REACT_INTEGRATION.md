# React Integration

## Typescript

When working with web components, react, and typescript you will need to help the type system out a bit getting the web components in.

Below is a working example of a file that will put all gux web components into the type system making everyone happy.

```typescript
import { JSX as LocalJSX } from "@genesys/common-webcomponents";
import { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * NOTES: Had to move them away from [P in keyof T]? because typescript was not happy with the undefined. 
 * It produced this error for memo and lazy react calls:
 *  - produces a union type that is too complex to represent
 * We are kinda lying here about the types because the gux elements have to be loaded in to exist. I think this lie is fine
 * because if you use the web components and did not load them in you will find out quickly during development and then 
 * add the one line to register them.
 */

type StencilProps<T> = {
    [P in keyof T]: Omit<T[P], "ref">;
};

type ReactProps<T> = {
    [P in keyof T]: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

// These lines below restrict to pulling in just the gux prefex web components.
// You need typescript 4.1 or above
type IsGux<K> = K extends `gux${infer _}` ? K : never;
type GuxKeys<T> = Pick<T, IsGux<keyof T>>; 

type StencilToReact<
    T = GuxKeys<LocalJSX.IntrinsicElements>, 
    U = GuxKeys<HTMLElementTagNameMap>
> = StencilProps<T> & ReactProps<U>;

declare global {
    export namespace JSX {
        interface IntrinsicElements extends StencilToReact {}
    }
}

export { registerElements } from "@genesys/common-webcomponents";

```
