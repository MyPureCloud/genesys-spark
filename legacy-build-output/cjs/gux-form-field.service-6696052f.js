'use strict';

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const logError = require('./log-error-ddbca3a0.js');
const setInputValue = require('./set-input-value-610d7da3.js');
const hasSlot = require('./has-slot-2e73d6e7.js');

const GuxFormFieldHelp = ({ show }, children) => {
  return (index.h("div", { class: {
      'gux-form-field-help': true,
      'gux-show': show
    } },
    index.h("div", { class: "gux-message" }, children)));
};

const GuxFormFieldError = ({ show }, children) => {
  return (index.h("div", { class: {
      'gux-form-field-error': true,
      'gux-show': show
    } },
    index.h("gux-icon", { "icon-name": "alert-warning-octogon", decorative: true }),
    index.h("div", { class: "gux-message" }, children)));
};

function clearInput(input) {
  setInputValue.setInputValue(input, '', true);
}
function hasContent(input) {
  return Boolean(input === null || input === void 0 ? void 0 : input.value);
}
function getComputedLabelPosition(label, labelPosition) {
  if (label) {
    if (['above', 'beside', 'screenreader'].includes(labelPosition)) {
      return labelPosition;
    }
    else if (label.offsetWidth > 1 && label.offsetWidth < 40) {
      return 'beside';
    }
    else {
      return 'above';
    }
  }
}
function validateFormIds(root, input) {
  var _a, _b, _c, _d;
  if (hasLabelSlot(root)) {
    const label = root.querySelector('label[slot="label"]');
    const inputHasId = Boolean(input.hasAttribute('id'));
    const labelHasFor = Boolean(label.hasAttribute('for'));
    if (!inputHasId && labelHasFor) {
      logError.logError(root.tagName.toLowerCase(), 'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.');
    }
    else if (!inputHasId) {
      const defaultInputId = randomHtmlId.randomHTMLId('gux-form-field-input');
      input.setAttribute('id', defaultInputId);
      label.setAttribute('for', defaultInputId);
    }
    else if (inputHasId && !labelHasFor) {
      const forId = input.getAttribute('id');
      label.setAttribute('for', forId);
    }
    else if (inputHasId &&
      labelHasFor &&
      input.getAttribute('id') !== label.getAttribute('for')) {
      logError.logError(root.tagName.toLowerCase(), 'The input id and label for attribute should match.');
    }
  }
  else {
    logError.logError(root.tagName.toLowerCase(), 'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.');
  }
  if (hasSlot.hasSlot(root, 'error')) {
    const error = root.querySelector('[slot="error"]');
    const errorId = randomHtmlId.randomHTMLId('gux-form-field-error');
    const describedByIds = ((_a = input
      .getAttribute('aria-describedby')) === null || _a === void 0 ? void 0 : _a.split(' ').filter(id => !id.startsWith(`gux-form-field-error`))) || [];
    error.setAttribute('id', errorId);
    describedByIds.push(errorId);
    describedByIds &&
      input.setAttribute('aria-describedby', describedByIds.join(' '));
  }
  else if (input.getAttribute('aria-describedby')) {
    const describedByIds = ((_b = input
      .getAttribute('aria-describedby')) === null || _b === void 0 ? void 0 : _b.split(' ').filter(id => !id.startsWith(`gux-form-field-error`))) || [];
    input.setAttribute('aria-describedby', describedByIds.join(' '));
  }
  if (hasSlot.hasSlot(root, 'help')) {
    const help = root.querySelector('[slot="help"]');
    const helpId = randomHtmlId.randomHTMLId('gux-form-field-help');
    const describedByIds = ((_c = input
      .getAttribute('aria-describedby')) === null || _c === void 0 ? void 0 : _c.split(' ').filter(id => !id.startsWith(`gux-form-field-help`))) || [];
    help.setAttribute('id', helpId);
    describedByIds.push(helpId);
    describedByIds &&
      input.setAttribute('aria-describedby', describedByIds.join(' '));
  }
  else if (input.getAttribute('aria-describedby')) {
    const describedByIds = ((_d = input
      .getAttribute('aria-describedby')) === null || _d === void 0 ? void 0 : _d.split(' ').filter(id => !id.startsWith(`gux-form-field-help`))) || [];
    input.setAttribute('aria-describedby', describedByIds.join(' '));
  }
}
function setSlotAriaDescribedby(root, input, slotName) {
  var _a;
  const slottedElement = root.querySelector(`[slot=${slotName}]`);
  const randomId = randomHtmlId.randomHTMLId(`gux-${slotName}`);
  const describedByIds = ((_a = input
    .getAttribute('aria-describedby')) === null || _a === void 0 ? void 0 : _a.split(' ').filter(id => !id.startsWith(`gux-${slotName}`))) || [];
  slottedElement.setAttribute('id', randomId);
  describedByIds === null || describedByIds === void 0 ? void 0 : describedByIds.push(randomId);
  describedByIds &&
    input.setAttribute('aria-describedby', describedByIds.join(' '));
}
function hasLabelSlot(root) {
  return Boolean(root.querySelector('label[slot="label"]'));
}

exports.GuxFormFieldError = GuxFormFieldError;
exports.GuxFormFieldHelp = GuxFormFieldHelp;
exports.clearInput = clearInput;
exports.getComputedLabelPosition = getComputedLabelPosition;
exports.hasContent = hasContent;
exports.setSlotAriaDescribedby = setSlotAriaDescribedby;
exports.validateFormIds = validateFormIds;
