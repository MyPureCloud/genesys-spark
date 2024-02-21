//https://inindca.atlassian.net/browse/COMUI-2673
export function closestPassShadow(
  node: Element | ParentNode | null,
  selector: string
): HTMLElement | null {
  if (!node) {
    return null;
  }

  if (node instanceof ShadowRoot) {
    return closestPassShadow(node.host, selector);
  }

  if (node instanceof HTMLElement) {
    if (node.matches(selector)) {
      return node;
    } else {
      return closestPassShadow(node.parentNode, selector);
    }
  }

  return closestPassShadow(node.parentNode, selector);
}
