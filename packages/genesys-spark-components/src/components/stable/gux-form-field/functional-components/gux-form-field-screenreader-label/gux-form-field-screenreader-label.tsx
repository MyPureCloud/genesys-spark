import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldScreenreaderLabelProps {}

export const GuxFormFieldScreenreaderLabel: FunctionalComponent<
  GuxFormFieldScreenreaderLabelProps
> = (_, children): VNode[] => {
  return (
    <legend class="gux-form-field-screenreader-label">{children}</legend>
  ) as VNode[];
};
