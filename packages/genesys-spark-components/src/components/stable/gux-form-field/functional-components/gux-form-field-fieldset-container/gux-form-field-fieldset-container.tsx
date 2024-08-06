import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldFieldsetContainerProps {
  labelPosition: GuxFormFieldLabelPosition;
  disabled?: boolean;
}

export const GuxFormFieldFieldsetContainer: FunctionalComponent<
  GuxFormFieldFieldsetContainerProps
> = ({ labelPosition, disabled }, children): VNode => {
  if (disabled) {
    return (
      <fieldset
        class={{
          'gux-form-field-fieldset-container': true,
          [`gux-${labelPosition}`]: Boolean(labelPosition)
        }}
        aria-disabled="true"
      >
        {children}
      </fieldset>
    ) as VNode;
  }

  return (
    <fieldset
      class={{
        'gux-form-field-fieldset-container': true,
        [`gux-${labelPosition}`]: Boolean(labelPosition)
      }}
    >
      {children}
    </fieldset>
  ) as VNode;
};
