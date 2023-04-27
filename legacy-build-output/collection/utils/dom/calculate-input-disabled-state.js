export function calculateInputDisabledState(element) {
  const fieldSet = element.closest('fieldset');
  return element.disabled || (fieldSet === null || fieldSet === void 0 ? void 0 : fieldSet.disabled);
}
