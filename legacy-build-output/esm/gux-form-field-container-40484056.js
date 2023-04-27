import { h } from './index-816e34d8.js';

const GuxFormFieldLabel = ({ position, required }, children) => {
  return (h("div", { class: {
      'gux-form-field-label': true,
      [`gux-${position}`]: true,
      'gux-required': required
    } }, children));
};

const GuxFormFieldContainer = ({ labelPosition }, children) => {
  return (h("div", { class: {
      'gux-form-field-container': true,
      [`gux-${labelPosition}`]: true
    } }, children));
};

export { GuxFormFieldLabel as G, GuxFormFieldContainer as a };
