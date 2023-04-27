import { h } from '@stencil/core';
export const GuxFormFieldError = ({ show }, children) => {
  return (h("div", { class: {
      'gux-form-field-error': true,
      'gux-show': show
    } }, h("gux-icon", { "icon-name": "alert-warning-octogon", decorative: true }), h("div", { class: "gux-message" }, children)));
};
