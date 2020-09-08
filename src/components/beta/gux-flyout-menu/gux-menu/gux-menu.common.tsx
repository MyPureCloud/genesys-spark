export type HTMLGuxMenuItemElement =
  | HTMLGuxMenuOptionElement
  | HTMLGuxSubmenuElement;

export const hideDelay = 250;

export function menuNavigation(
  event: KeyboardEvent,
  currentElement: Element
): void {
  switch (event.key) {
    case 'ArrowUp':
      event.stopPropagation();
      event.preventDefault();

      focusPreviousSiblingLoop(currentElement);
      break;

    case 'ArrowDown':
      event.stopPropagation();
      event.preventDefault();

      focusNextSiblingLoop(currentElement);
      break;

    case 'ArrowRight':
      event.preventDefault();

      break;

    case 'ArrowLeft':
      event.preventDefault();

      break;

    case 'Home':
      event.stopPropagation();
      event.preventDefault();

      focusFirstSibling(currentElement);
      break;

    case 'End':
      event.stopPropagation();
      event.preventDefault();

      focusLastSibling(currentElement);
      break;
  }
}

function focusFirstSibling(currentElement: Element): void {
  const firstFocusableElement = getFirstFocusableElement(
    currentElement
  ) as HTMLGuxMenuOptionElement;

  if (firstFocusableElement) {
    firstFocusableElement.guxFocus();
  }
}

function focusLastSibling(currentElement: Element): void {
  const lastFocusableElement = getLastFocusableElement(
    currentElement
  ) as HTMLGuxMenuOptionElement;

  if (lastFocusableElement) {
    lastFocusableElement.guxFocus();
  }
}

function focusPreviousSiblingLoop(currentElement: Element): void {
  const previousFocusableElement = currentElement.previousElementSibling as HTMLGuxMenuOptionElement;

  if (previousFocusableElement) {
    previousFocusableElement.guxFocus();
  } else {
    focusLastSibling(currentElement);
  }
}

function focusNextSiblingLoop(currentElement: Element): void {
  const nextFocusableElement = currentElement.nextElementSibling as HTMLGuxMenuOptionElement;

  if (nextFocusableElement) {
    nextFocusableElement.guxFocus();
  } else {
    focusFirstSibling(currentElement);
  }
}

function getFirstFocusableElement(currentElement: Element): Element {
  let firstFocusableElement = currentElement;

  while (firstFocusableElement.previousElementSibling !== null) {
    firstFocusableElement = firstFocusableElement.previousElementSibling;
  }

  return firstFocusableElement;
}

function getLastFocusableElement(currentElement: Element): Element {
  let lastFocusableElement = currentElement;

  while (lastFocusableElement.nextElementSibling !== null) {
    lastFocusableElement = lastFocusableElement.nextElementSibling;
  }

  return lastFocusableElement;
}
