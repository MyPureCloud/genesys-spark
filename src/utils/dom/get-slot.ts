export function getSlot(
  element: HTMLElement,
  slotName: string
): HTMLSlotElement {
  return element.querySelector(`[slot=${slotName}]`);
}
