export function getSlotTextContent(
  root: HTMLElement,
  slotName: string
): string {
  return root.querySelector(`[slot=${slotName}]`)?.textContent;
}
