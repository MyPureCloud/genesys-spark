# gux-switch-legacy

[Back to main guide](./readme.md)

The `gux-switch` component is now becoming `legacy` and will be replaced by the `gux-segmented-control-beta` component.

We have seen instances in apps where `gux-switch` was used as a tab like component. This was not the intended use for the component.
If you are currently using `gux-switch` as a tab like component please migrate that UI to use the `gux-tabs` component not `gux-segmented-control-beta`.
Refer to The Spark Design System site for more info on this: https://spark.genesys.com/latest/components/forms-and-inputs/segmented-control/usage-PLofObXx#section-usage-d3

## V3 gux-pagination example

```html
<gux-switch
  layout="default"
  value="month"
  onchange="notify(event)"
  oninput="notify(event)"
>
  <gux-switch-item value="month">Month</gux-switch-item>
  <gux-switch-item value="week" disabled>Week</gux-switch-item>
  <gux-switch-item value="day">Day</gux-switch-item>
  <gux-switch-item value="hour">Hour</gux-switch-item>
  <gux-switch-item value="minute">Minute</gux-switch-item>
</gux-switch>
```

## V4 Basic Migration: Add "-legacy" to Tag Name

Steps:

- Replace the `gux-switch` tag with `gux-switch-legacy` tag

```diff
- <gux-switch
+ <gux-switch-legacy
  ...
- </gux-switch>
+ </gux-switch-legacy>
```

Completed V3 Basic Migration:

```html
<gux-switch-legacy
  layout="default"
  value="month"
  onchange="notify(event)"
  oninput="notify(event)"
>
  <gux-switch-item value="month">Month</gux-switch-item>
  <gux-switch-item value="week" disabled>Week</gux-switch-item>
  <gux-switch-item value="day">Day</gux-switch-item>
  <gux-switch-item value="hour">Hour</gux-switch-item>
  <gux-switch-item value="minute">Minute</gux-switch-item>
</gux-switch-legacy>
```

## V4 Full Migration to gux-segmented-control-beta

```html
<gux-segmented-control-beta
  value="month"
  onchange="notify(event)"
  oninput="notify(event)"
>
  <gux-segmented-control-item value="month">
    <div slot="text">Month</div>
  </gux-segmented-control-item>
  <gux-segmented-control-item value="week" disabled>
    <div slot="text">Week</div>
  </gux-segmented-control-item>
  <gux-segmented-control-item value="day">
    <div slot="text">Day</div>
  </gux-segmented-control-item>
  <gux-segmented-control-item value="hour">
    <div slot="text">Hour</div>
  </gux-segmented-control-item>
  <gux-segmented-control-item value="minute">
    <div slot="text">Minute</div>
  </gux-segmented-control-item>
</gux-segmented-control-beta>
```
