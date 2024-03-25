//https://inindca.atlassian.net/browse/COMUI-2673
// utility to get the closest element passing shadow dom boundaries
export function getClosestElement(node, selector) {
  if (!node) {
    return null;
  }
  if (node instanceof ShadowRoot) {
    return getClosestElement(node.host, selector);
  }
  if (node instanceof HTMLElement) {
    if (node.matches(selector)) {
      return node;
    } else {
      return getClosestElement(node.parentNode, selector);
    }
  }
  return getClosestElement(node.parentNode, selector);
}
