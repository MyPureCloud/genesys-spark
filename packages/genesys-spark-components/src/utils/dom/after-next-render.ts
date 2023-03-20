export function afterNextRender(callback: FrameRequestCallback): void {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

export function afterNextRenderTimeout(
  callback: () => void,
  delay: number = 100
): ReturnType<typeof setTimeout> {
  return setTimeout(callback, delay);
}
