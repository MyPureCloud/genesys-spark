import { FunctionalComponent, h, VNode } from '@stencil/core';

import {
  GuxFormFieldLabelPosition,
  GuxFormFieldIndicatorMark
} from '../../gux-form-field.types';

interface GuxFormFieldLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
  indicatorMark?: GuxFormFieldIndicatorMark;
}

export const GuxFormFieldLabel: FunctionalComponent<GuxFormFieldLabelProps> = (
  { position, required, indicatorMark = 'required' },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-label': true,
        [`gux-${position}`]: true
      }}
    >
      {children}
      <gux-form-field-label-indicator
        variant={indicatorMark}
        required={required}
      />
    </div>
  ) as VNode;
};
