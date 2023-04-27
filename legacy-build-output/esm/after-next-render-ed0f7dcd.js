function afterNextRender(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
function afterNextRenderTimeout(callback, delay = 100) {
  return setTimeout(callback, delay);
}

export { afterNextRenderTimeout as a, afterNextRender as b };
