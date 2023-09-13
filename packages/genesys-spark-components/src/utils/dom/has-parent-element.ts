import { getClosestElement } from './get-closest-element';

export function hasParentElement(
  selector: string,
  baseElement: HTMLElement = this
) {
  return Boolean(getClosestElement(selector, baseElement));
}
