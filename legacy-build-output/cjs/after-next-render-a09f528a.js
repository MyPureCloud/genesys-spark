'use strict';

function afterNextRender(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
function afterNextRenderTimeout(callback, delay = 100) {
  return setTimeout(callback, delay);
}

exports.afterNextRender = afterNextRender;
exports.afterNextRenderTimeout = afterNextRenderTimeout;
