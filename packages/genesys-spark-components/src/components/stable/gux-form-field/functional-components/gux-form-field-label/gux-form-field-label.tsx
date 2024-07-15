import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
}

export const GuxFormFieldLabel: FunctionalComponent<GuxFormFieldLabelProps> = (
  { position, required },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-label': true,
        [`gux-${position}`]: true,
        'gux-required': required
      }}
    >
      {children}
    </div>
  ) as VNode;
};
