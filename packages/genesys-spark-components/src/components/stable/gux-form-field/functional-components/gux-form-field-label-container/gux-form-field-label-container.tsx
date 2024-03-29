import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLabelContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldLabelContainer: FunctionalComponent<
  GuxFormFieldLabelContainerProps
> = ({ labelPosition }, children): VNode => {
  return (
    <div
      class={{
        'gux-form-field-label-container': true,
        [`gux-${labelPosition}`]: true
      }}
    >
      {children}
    </div>
  ) as VNode;
};
