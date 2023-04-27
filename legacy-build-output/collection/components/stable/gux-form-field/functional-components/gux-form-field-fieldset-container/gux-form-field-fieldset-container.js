import { h } from '@stencil/core';
export const GuxFormFieldFieldsetContainer = ({ labelPosition }, children) => {
  return (h("fieldset", { class: {
      'gux-form-field-fieldset-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};
