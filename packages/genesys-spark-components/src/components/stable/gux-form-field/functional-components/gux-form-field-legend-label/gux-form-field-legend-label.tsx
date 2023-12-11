import { FunctionalComponent, h, VNode } from '@stencil/core';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';

interface GuxFormFieldLegendLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
  labelText: string;
}

export const GuxFormFieldLegendLabel: FunctionalComponent<
  GuxFormFieldLegendLabelProps
> = ({ position, required, labelText }, children): VNode[] => {
  return [
    <legend class="gux-form-field-legend-label gux-screenreader">
      {children}
    </legend>,
    <span
      class={{
        'gux-form-field-legend-label': true,
        [`gux-${position}`]: true,
        'gux-required': required
      }}
      role="presentation"
      aria-hidden="true"
    >
      {labelText}
    </span>
  ] as VNode[];
};
