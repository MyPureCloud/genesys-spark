import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
  showAsterisk?: boolean;
}

export const GuxFormFieldLabel: FunctionalComponent<GuxFormFieldLabelProps> = (
  { position, required, showAsterisk = true },
  children
): VNode => {
  return (
    <div
      class={{
        'gux-form-field-label': true,
        [`gux-${position}`]: true,
        'gux-required': required,
        'gux-asterisk': required && showAsterisk //This is temporary until the other components are updated to match text-like
      }}
    >
      {children}
    </div>
  ) as VNode;
};
