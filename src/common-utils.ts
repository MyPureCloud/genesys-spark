export function getPositionRelativeToTarget (element: HTMLElement, target: HTMLElement, options?: { [s: string]: number; }): { [s: string]: number; } {
  const elementRect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const resultRect: { [s: string]: number; } = {};

  const offsetX = (options && options.offsetX) ? options.offsetX : 0;
  const offsetY = (options && options.offsetY) ? options.offsetY : 0;

  // Top behavior
  if (window.innerHeight <= elementRect.height) {
    resultRect.top = offsetY;
    resultRect.height = window.innerHeight - (offsetY * 2);
  } if ((targetRect.bottom + elementRect.height + offsetY) >= window.innerHeight) {
    resultRect.bottom = window.innerHeight - targetRect.top + offsetY;
  } else {
    resultRect.top = targetRect.top + targetRect.height + offsetY;
  }
  // Left behavior
  if (window.innerWidth <= elementRect.width) {
    resultRect.left = offsetX;
    resultRect.width = window.innerWidth - (offsetX * 2);
  } else if ((targetRect.left + elementRect.width + offsetX) >= window.innerWidth) {
    resultRect.right = window.innerWidth - targetRect.right + offsetX;
  } else {
    resultRect.left = targetRect.left + offsetX;
  }
  return resultRect;
};
