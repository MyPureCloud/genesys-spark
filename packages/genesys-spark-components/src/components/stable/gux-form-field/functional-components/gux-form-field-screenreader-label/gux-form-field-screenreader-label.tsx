import { FunctionalComponent, h, VNode } from '@stencil/core';

export const GuxFormFieldScreenreaderLabel: FunctionalComponent<object> = (
  _,
  children
): VNode[] => {
  return (
    <legend class="gux-form-field-screenreader-label">{children}</legend>
  ) as VNode[];
};
