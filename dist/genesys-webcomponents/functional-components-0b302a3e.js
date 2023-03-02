import './gux-form-field.service-ad9b681c.js';
import { h } from './index-f583fcde.js';

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

export { GuxFormFieldContainer as G, GuxFormFieldLabel as a };
