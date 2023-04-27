export function afterNextRender(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
export function afterNextRenderTimeout(callback, delay = 100) {
  return setTimeout(callback, delay);
}
