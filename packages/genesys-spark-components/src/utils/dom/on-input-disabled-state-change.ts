import { calculateInputDisabledState } from './calculate-input-disabled-state';

export function onInputDisabledStateChange(
  element:
    | HTMLButtonElement
    | HTMLFieldSetElement
    | HTMLInputElement
    | HTMLOptGroupElement
    | HTMLOptionElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxDropdownElement
    | HTMLGuxDropdownMultiElement,
  callback: (disabled: boolean) => void
): MutationObserver {
  const fieldSet = element.closest('fieldset');

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'disabled') {
        callback(calculateInputDisabledState(element));
      }
    });
  });

  observer.observe(element, { attributes: true });

  if (fieldSet) {
    observer.observe(fieldSet, { attributes: true });
  }

  return observer;
}
