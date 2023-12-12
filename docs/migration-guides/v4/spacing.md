# Spacing Classes

[Back to main guide](./readme.md)

In V4, we are using Spark tokens and will no longer be exporting the following classes. Read more about the new Spark 4.0 Design System spacing guidelines on the [Spark Design System documentation site](https://spark.genesys.com/latest/foundations/spacing/design-MpmyI1Ym)

## V4 Basic Migration

The variables `gux-spacing-*` no longer exist within v4 and have need to be replaced with the corresponding px values from the table below.

| Variable name      | value |
| ------------------ | ----- |
| gux-spacing-3xs    | 2px   |
| gux-spacing-2xs    | 4px   |
| gux-spacing-xs     | 8px   |
| gux-spacing-small  | 12px  |
| gux-spacing-medium | 16px  |
| gux-spacing-large  | 24px  |
| gux-spacing-xl     | 32px  |
| gux-spacing-2xl    | 40px  |
| gux-spacing-3xl    | 48px  |
| gux-spacing-4xl    | 64px  |

Example:

- Replace the `gux-spacing-3xs` variable with the following px value.

```diff
- gux-spacing-3xs;
+ 2px;
```

## V4 Full Migration

Below is a table which represents new v4 spacing tokens which can be used within your application. Simply replace a spacing value with one of the token names outlined below. Read more about the new Spark 4.0 Design System spacing guidelines on the [Spark Design System documentation site](https://spark.genesys.com/latest/foundations/spacing/design-MpmyI1Ym)

| Token name             | Token value |
| ---------------------- | ----------- |
| --gse-core-spacing-4xs | 4px         |
| --gse-core-spacing-3xs | 8px         |
| --gse-core-spacing-2xs | 12px        |
| --gse-core-spacing-xs  | 16px        |
| --gse-core-spacing-sm  | 20px        |
| --gse-core-spacing-md  | 24px        |
| --gse-core-spacing-lg  | 32px        |

Example:

- Replace the `gux-spacing-2xs` variable with a spacing token.

```diff
- gux-spacing-2xs;
+ var(--gse-core-spacing-4xs);
```
