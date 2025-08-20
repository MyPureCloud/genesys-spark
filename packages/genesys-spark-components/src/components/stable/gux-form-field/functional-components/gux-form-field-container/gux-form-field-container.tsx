import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
  characterLimit?: number;
}

export const GuxFormFieldContainer: FunctionalComponent<
  GuxFormFieldContainerProps
> = ({ labelPosition, characterLimit }, children): VNode => {
  return (
    <div
      class={{
        'gux-form-field-container': true,
        [`gux-${labelPosition}`]: true,
        'gux-character-counter': characterLimit > 0
      }}
    >
      {children}
    </div>
  ) as VNode;
};
