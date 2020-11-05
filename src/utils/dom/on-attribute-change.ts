export function onHiddenChange(
  element: HTMLElement,
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
  element: HTMLInputElement,
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
