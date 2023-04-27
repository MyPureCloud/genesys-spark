'use strict';

function logError(component, message) {
  setTimeout(() => {
    throw new Error(`[${component}] ${message}`);
  }, 0);
}
function logWarn(component, message) {
  setTimeout(() => {
    console.warn(`[${component}] ${message}`);
  }, 0);
}

exports.logError = logError;
exports.logWarn = logWarn;
