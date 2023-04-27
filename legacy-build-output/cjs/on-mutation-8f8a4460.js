'use strict';

function onMutation(element, callback, options = {}) {
  const observer = new MutationObserver(callback);
  observer.observe(element, Object.assign({
    attributes: true,
    childList: true,
    subtree: true
  }, options));
  return observer;
}

exports.onMutation = onMutation;
