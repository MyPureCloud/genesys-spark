export function getPositionRelativeToTarget (element: HTMLElement, target: HTMLElement, options?: { [s: string]: number; }): { [s: string]: number; } {
  const elementRect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const resultRect: { [s: string]: number; } = {};

  const offsetX = (options && options.offsetX) ? options.offsetX : 0;
  const offsetY = (options && options.offsetY) ? options.offsetY : 0;
  let width = elementRect.width;
  width = (options && options.width) ? options.width : width;
  let height = elementRect.height;
  height = (options && options.height) ? options.height : height;

  // Top behavior
  if ((window.innerHeight - targetRect.top) > (height + offsetY)) {
    resultRect.top = targetRect.bottom + offsetY;
  } else if (targetRect.bottom > (height + offsetY)) {
    resultRect.bottom = window.innerHeight - (targetRect.top - offsetY);
  } else if (window.innerHeight > (height + (offsetY * 2))) {
    resultRect.top = (window.innerHeight - (height + (offsetY * 2))) / 2;
    resultRect.bottom = (window.innerHeight - (height + (offsetY * 2))) / 2;
  } else {
    resultRect.top = offsetY;
    resultRect.bottom = offsetY;
  }
  // Left behavior
  if ((window.innerWidth - targetRect.left) > (width + offsetX)) {
    resultRect.left = targetRect.left + offsetX;
  } else if (targetRect.right > (width + offsetX)) {
    resultRect.right = window.innerWidth - (targetRect.right + offsetX);
  } else if (window.innerWidth > (width + (offsetX * 2))) {
    resultRect.left = (window.innerWidth - (width + (offsetX * 2))) / 2;
    resultRect.right = (window.innerWidth - (width + (offsetX * 2))) / 2;
  } else {
    resultRect.left = offsetX;
    resultRect.right = offsetX;
  }
  return resultRect;
};
