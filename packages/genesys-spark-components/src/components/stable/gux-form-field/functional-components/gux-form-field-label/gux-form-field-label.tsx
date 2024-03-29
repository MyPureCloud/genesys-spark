import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldLabelProps {
  required: boolean;
}

export const GuxFormFieldLabel: FunctionalComponent<GuxFormFieldLabelProps> = (
  { required },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-label': true,
        'gux-required': required
      }}
    >
      {children}
    </div>
  ) as VNode;
};
