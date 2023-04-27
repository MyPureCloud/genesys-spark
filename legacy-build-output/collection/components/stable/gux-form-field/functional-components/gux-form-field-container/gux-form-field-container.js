import { h } from '@stencil/core';
export const GuxFormFieldContainer = ({ labelPosition }, children) => {
  return (h("div", { class: {
      'gux-form-field-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};
