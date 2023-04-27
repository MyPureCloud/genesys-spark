export function getSlot(element, slotName) {
  return element === null || element === void 0 ? void 0 : element.querySelector(`[slot=${slotName}]`);
}
