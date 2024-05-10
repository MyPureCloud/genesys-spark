//https://inindca.atlassian.net/browse/COMUI-2673
// utility to get the closest element passing shadow dom boundaries
export function getClosestElement(
  // @ts-expect-error: to be addressed in COMUI-2673, genesys-spark typescript is stricter than the rest of the project
  baseElement: HTMLElement = this,
  selector: string
) {
  function closest(element: Element | Window | Document): Element {
    if (!element || element === document || element === window) {
      // @ts-expect-error: to be addressed in COMUI-2673, genesys-spark typescript is stricter than the rest of the project
      return null;
    }

    if ((element as Element).assignedSlot) {
      // @ts-expect-error: to address in COMUI-2673, genesys-spark typescript is stricter than the rest of the project
      element = (element as Element).assignedSlot;
    }

    const found = (element as Element).closest(selector);

    return found
      ? found
      : closest(((element as Element).getRootNode() as ShadowRoot).host);
  }

  return closest(baseElement);
}
