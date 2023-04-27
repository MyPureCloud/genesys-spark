'use strict';

const index = require('./index-d3bc59d7.js');

const GuxFormFieldLegendLabel = ({ position, required }, children) => {
  return (index.h("legend", { class: {
      'gux-form-field-legend-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};

const GuxFormFieldFieldsetContainer = ({ labelPosition }, children) => {
  return (index.h("fieldset", { class: {
      'gux-form-field-fieldset-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};

function getSlotTextContent(root, slotName) {
  var _a;
  return (_a = root.querySelector(`[slot=${slotName}]`)) === null || _a === void 0 ? void 0 : _a.textContent;
}

exports.GuxFormFieldFieldsetContainer = GuxFormFieldFieldsetContainer;
exports.GuxFormFieldLegendLabel = GuxFormFieldLegendLabel;
exports.getSlotTextContent = getSlotTextContent;
