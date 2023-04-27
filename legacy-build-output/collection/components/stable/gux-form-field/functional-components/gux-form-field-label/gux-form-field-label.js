import { h } from '@stencil/core';
export const GuxFormFieldLabel = ({ position, required }, children) => {
  return (h("div", { class: {
      'gux-form-field-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};
