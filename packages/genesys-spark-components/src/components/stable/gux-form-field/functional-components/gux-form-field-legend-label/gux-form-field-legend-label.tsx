import { FunctionalComponent, h, VNode } from '@stencil/core';

import {
  GuxFormFieldLabelPosition,
  GuxFormFieldIndicatorMark
} from '../../gux-form-field.types';

interface GuxFormFieldLegendLabelProps {
  position: GuxFormFieldLabelPosition;
  required: boolean;
  labelText: string;
  indicatorMark?: GuxFormFieldIndicatorMark;
}

export const GuxFormFieldLegendLabel: FunctionalComponent<
  GuxFormFieldLegendLabelProps
> = (
  { position, required, labelText, indicatorMark = 'required' },
  children
): VNode[] => {
  return [
    <legend class="gux-form-field-legend-label gux-screenreader">
      {children}
    </legend>,
    <span
      class={{
        'gux-form-field-legend-label': true,
        [`gux-${position}`]: true
      }}
      role="presentation"
      aria-hidden="true"
    >
      {labelText}
      <gux-form-field-label-indicator
        variant={indicatorMark}
        required={required}
      />
    </span>
  ] as VNode[];
};
