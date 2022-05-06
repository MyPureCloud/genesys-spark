import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldContainer: FunctionalComponent<
  GuxFormFieldContainerProps
> = ({ labelPosition }, children): VNode => {
  return (
    <div
      class={{
        'gux-form-field-container': true,
        [`gux-${labelPosition}`]: true
      }}
    >
      {children}
    </div>
  ) as VNode;
};
