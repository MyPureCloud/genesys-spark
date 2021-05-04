export function onMutation(
  element: HTMLElement,
  callback: MutationCallback,
  options: MutationObserverInit = {}
): MutationObserver {
  const observer = new MutationObserver(callback);

  observer.observe(
    element,
    Object.assign(
      {
        attributes: true,
        childList: true,
        subtree: true
      },
      options
    )
  );

  return observer;
}
