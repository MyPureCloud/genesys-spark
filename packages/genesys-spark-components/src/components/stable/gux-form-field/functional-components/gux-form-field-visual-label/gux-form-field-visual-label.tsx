import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldVisualLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
}

export const GuxFormFieldVisualLabel: FunctionalComponent<
  GuxFormFieldVisualLabelProps
> = ({ position, required }, children): VNode => {
  return (
    <div
      class={{
        'gux-form-field-visual-label': true,
        [`gux-${position}`]: true,
        'gux-required': required
      }}
      role="presentation"
    >
      {children}
    </div>
  ) as VNode;
};
