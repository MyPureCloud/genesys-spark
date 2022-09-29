import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldFieldsetContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
}

export const GuxFormFieldFieldsetContainer: FunctionalComponent<
  GuxFormFieldFieldsetContainerProps
> = ({ labelPosition }, children): VNode => {
  return (
    <fieldset
      class={{
        'gux-form-field-fieldset-container': true,
        [`gux-${labelPosition}`]: true
      }}
    >
      {children}
    </fieldset>
  ) as VNode;
};
