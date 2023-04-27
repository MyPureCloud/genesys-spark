export function getSlotTextContent(root, slotName) {
  var _a;
  return (_a = root.querySelector(`[slot=${slotName}]`)) === null || _a === void 0 ? void 0 : _a.textContent;
}
