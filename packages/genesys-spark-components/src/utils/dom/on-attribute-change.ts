export function onHiddenChange(
  element: HTMLElement | HTMLSelectElement,
  callback: (hidden: boolean) => void
): MutationObserver {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      callback(element.hidden);
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ['hidden']
  });

  return observer;
}

export function onDisabledChange(
  element:
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxDropdownElement
    | HTMLGuxTimePickerElement
    | HTMLGuxPhoneInputBetaElement
    | HTMLGuxTimeZonePickerBetaElement,
  callback: (disabled: boolean) => void
): MutationObserver {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'disabled') {
        callback(element.disabled);
      }
    });
  });

  observer.observe(element, { attributes: true });

  return observer;
}

export function onRequiredChange(
  element:
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLGuxDropdownElement
    | HTMLGuxDropdownMultiElement
    | HTMLGuxTimePickerElement
    | HTMLGuxPhoneInputBetaElement
    | HTMLGuxTimeZonePickerBetaElement,
  callback: (disabled: boolean) => void
): MutationObserver {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'required') {
        callback(element.required);
      }
    });
  });

  observer.observe(element, { attributes: true });

  return observer;
}
