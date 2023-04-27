'use strict';

function onHiddenChange(element, callback) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      callback(element.hidden);
    });
  });
  observer.observe(element, {
    attributes: true,
    attributeFilter: ['hidden']
  });
  return observer;
}
function onDisabledChange(element, callback) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'disabled') {
        callback(element.disabled);
      }
    });
  });
  observer.observe(element, { attributes: true });
  return observer;
}
function onRequiredChange(element, callback) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'required') {
        callback(element.required);
      }
    });
  });
  observer.observe(element, { attributes: true });
  return observer;
}

exports.onDisabledChange = onDisabledChange;
exports.onHiddenChange = onHiddenChange;
exports.onRequiredChange = onRequiredChange;
