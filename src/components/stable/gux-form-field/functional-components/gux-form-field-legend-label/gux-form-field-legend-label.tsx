import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLegendLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
}

export const GuxFormFieldLegendLabel: FunctionalComponent<
  GuxFormFieldLegendLabelProps
> = ({ position, required }, children): VNode => {
  return (
    <legend
      class={{
        'gux-form-field-legend-label': true,
        [`gux-${position}`]: true,
        'gux-required': required
      }}
    >
      {children}
    </legend>
  ) as VNode;
};
