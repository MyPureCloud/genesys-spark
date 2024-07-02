import { FunctionalComponent, h, VNode } from '@stencil/core';

interface GuxFormFieldLegendLabelProps {
  required: boolean;
  labelText: string;
}

export const GuxFormFieldLegendLabel: FunctionalComponent<
  GuxFormFieldLegendLabelProps
> = ({ required, labelText }, children): VNode[] => {
  return [
    <legend class="gux-form-field-legend-label gux-screenreader">
      {children}
    </legend>,
    <div
      class={{
        'gux-form-field-legend-label': true,
        'gux-required': required
      }}
      role="presentation"
      aria-hidden="true"
    >
      {labelText}
    </div>
  ] as VNode[];
};
