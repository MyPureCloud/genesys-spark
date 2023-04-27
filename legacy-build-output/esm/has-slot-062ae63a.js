function hasSlot(element, slotName) {
  return Boolean(element.querySelector(`[slot=${slotName}]`));
}

export { hasSlot as h };
