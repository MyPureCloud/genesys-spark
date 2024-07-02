import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLegendLabelContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldLegendLabelContainer: FunctionalComponent<
  GuxFormFieldLegendLabelContainerProps
> = ({ labelPosition }, children): VNode => {
  return (
    <div
      class={{
        'gux-form-field-legend-label-container': true,
        [`gux-${labelPosition}`]: true
      }}
    >
      {children}
    </div>
  ) as VNode;
};
