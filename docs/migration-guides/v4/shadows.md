# Shadow Classes

[Back to main guide](./readme.md)

In V4, we are using Spark tokens and will no longer be exporting the following classes. Replace instances of the following classes with the corresponding box-shadow styling.

## V4 Full Migration

The classes `.gux-shadow-*` no longer exist within v4 and have been replaced with the corresponding `box-shadow` stylings outlined in the table below.

| class name     | value                                      |
| -------------- | ------------------------------------------ |
| .gux-shadow-10 | box-shadow: 0 0 2px fade(#202937, 16%);    |
| .gux-shadow-20 | box-shadow: 0 2px 4px fade(#202937, 24%);  |
| .gux-shadow-30 | box-shadow: 0 8px 24px fade(#202937, 40%); |
| .gux-shadow-40 | box-shadow: 0 3px 14px fade(#2e394c, 22%); |

Example:

- Replace `.gux-shadow-10` class with the following `box-shadow` styling.

```diff
.gux-container {
- .gux-shadow-10();
+ box-shadow: 0 0 2px fade(#202937, 16%);
}
```
