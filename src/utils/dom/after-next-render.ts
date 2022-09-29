export function afterNextRender(callback: FrameRequestCallback): void {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
