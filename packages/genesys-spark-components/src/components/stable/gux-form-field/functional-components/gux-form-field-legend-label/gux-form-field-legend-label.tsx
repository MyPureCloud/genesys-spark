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
    <div
      class={{
        'gux-form-field-legend-label': true,
        [`gux-${position}`]: true
      }}
    >
      <legend
        class={{
          'gux-required': required
        }}
      >
        {children}
      </legend>
    </div>
  ) as VNode;
};
