'use strict';

function calculateInputDisabledState(element) {
  const fieldSet = element.closest('fieldset');
  return element.disabled || (fieldSet === null || fieldSet === void 0 ? void 0 : fieldSet.disabled);
}

function onInputDisabledStateChange(element, callback) {
  const fieldSet = element.closest('fieldset');
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'disabled') {
        callback(calculateInputDisabledState(element));
      }
    });
  });
  observer.observe(element, { attributes: true });
  if (fieldSet) {
    observer.observe(fieldSet, { attributes: true });
  }
  return observer;
}

exports.calculateInputDisabledState = calculateInputDisabledState;
exports.onInputDisabledStateChange = onInputDisabledStateChange;
