import { getClosestElement } from './get-closest-element';

export function getAttributeFromParent(
  selector: string,
  root: HTMLElement,
  attribute: string
) {
  const getParent = getClosestElement(selector, root);
  return getParent?.getAttribute(attribute);
}
