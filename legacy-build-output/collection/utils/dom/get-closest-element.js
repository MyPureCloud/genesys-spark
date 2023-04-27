export function getClosestElement(selector, baseElement = this) {
  function closest(element) {
    if (!element || element === document || element === window) {
      return null;
    }
    if (element.assignedSlot) {
      element = element.assignedSlot;
    }
    const found = element.closest(selector);
    return found
      ? found
      : closest(element.getRootNode().host);
  }
  return closest(baseElement);
}
