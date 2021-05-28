export function hasSlot(element: HTMLElement, slotName: string): boolean {
  return Boolean(element.querySelector(`[slot=${slotName}]`));
}
