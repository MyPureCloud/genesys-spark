export function afterRender(callback: FrameRequestCallback): void {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
