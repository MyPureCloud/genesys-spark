import { h } from './index-816e34d8.js';

const GuxFormFieldLegendLabel = ({ position, required }, children) => {
  return (h("legend", { class: {
      'gux-form-field-legend-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};

const GuxFormFieldFieldsetContainer = ({ labelPosition }, children) => {
  return (h("fieldset", { class: {
      'gux-form-field-fieldset-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};

function getSlotTextContent(root, slotName) {
  var _a;
  return (_a = root.querySelector(`[slot=${slotName}]`)) === null || _a === void 0 ? void 0 : _a.textContent;
}

export { GuxFormFieldLegendLabel as G, GuxFormFieldFieldsetContainer as a, getSlotTextContent as g };
