import { calculateInputDisabledState } from './calculate-input-disabled-state';
export function onInputDisabledStateChange(element, callback) {
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
