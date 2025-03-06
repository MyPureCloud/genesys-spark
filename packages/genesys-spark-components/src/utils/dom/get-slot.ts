export function getSlot(element: HTMLElement, slotName: string): HTMLElement {
  return element?.querySelector(`[slot=${slotName}]`);
}
