import { h } from '@stencil/core';
export const GuxFormFieldHelp = ({ show }, children) => {
  return (h("div", { class: {
      'gux-form-field-help': true,
      'gux-show': show
    } }, h("div", { class: "gux-message" }, children)));
};
