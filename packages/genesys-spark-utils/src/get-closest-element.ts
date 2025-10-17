// utility to get the closest element passing shadow dom boundaries
export function getClosestElement(baseElement: HTMLElement, selector: string) {
  function closest(
    element: Element | Window | Document | null
  ): Element | null {
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
