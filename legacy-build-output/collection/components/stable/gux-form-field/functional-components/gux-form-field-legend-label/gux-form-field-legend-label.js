import { h } from '@stencil/core';
export const GuxFormFieldLegendLabel = ({ position, required }, children) => {
  return (h("legend", { class: {
      'gux-form-field-legend-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};
