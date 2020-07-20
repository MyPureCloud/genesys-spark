export default function onDisabledChange(
  element: HTMLInputElement,
  callback: (disabled: boolean) => void
) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'disabled') {
        callback(element.disabled);
      }
    });
  });

  observer.observe(element, { attributes: true });
}
