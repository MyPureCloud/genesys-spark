'use strict';

const index = require('./index-d3bc59d7.js');

const GuxFormFieldLabel = ({ position, required }, children) => {
  return (index.h("div", { class: {
      'gux-form-field-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};

const GuxFormFieldContainer = ({ labelPosition }, children) => {
  return (index.h("div", { class: {
      'gux-form-field-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};

exports.GuxFormFieldContainer = GuxFormFieldContainer;
exports.GuxFormFieldLabel = GuxFormFieldLabel;
