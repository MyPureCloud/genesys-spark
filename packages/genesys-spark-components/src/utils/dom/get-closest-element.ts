export function getClosestElement(
  selector: string,
  baseElement: HTMLElement = this
) {
  function closest(element: Element | Window | Document): Element {
    if (!element || element === document || element === window) {
      return null;
    }

    if ((element as Element).assignedSlot) {
      element = (element as Element).assignedSlot;
    }

    const found = (element as Element).closest(selector);

    return found
      ? found
      : closest(((element as Element).getRootNode() as ShadowRoot).host);
  }

  return closest(baseElement);
}
