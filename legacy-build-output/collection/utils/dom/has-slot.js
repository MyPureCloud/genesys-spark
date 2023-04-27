export function hasSlot(element, slotName) {
  return Boolean(element.querySelector(`[slot=${slotName}]`));
}
