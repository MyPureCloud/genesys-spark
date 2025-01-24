export function overflowNavigation(
  event: KeyboardEvent,
  currentElement: Element
): void {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      event.stopPropagation();
      event.preventDefault();

      focusPreviousSiblingLoop(currentElement);
      break;

    case 'ArrowDown':
    case 'ArrowRight':
      event.stopPropagation();
      event.preventDefault();

      focusNextSiblingLoop(currentElement);
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
  ) as HTMLGuxAvatarOverflowItemBetaElement;

  if (firstFocusableElement) {
    void firstFocusableElement.focus();
  }
}

function focusLastSibling(currentElement: Element): void {
  const lastFocusableElement = getLastFocusableElement(
    currentElement
  ) as HTMLGuxAvatarOverflowItemBetaElement;

  if (lastFocusableElement) {
    void lastFocusableElement.focus();
  }
}

function focusPreviousSiblingLoop(currentElement: Element): void {
  const previousFocusableElement =
    currentElement.previousElementSibling as HTMLGuxAvatarOverflowItemBetaElement;

  if (previousFocusableElement) {
    void previousFocusableElement.focus();
  } else {
    focusLastSibling(currentElement);
  }
}

function focusNextSiblingLoop(currentElement: Element): void {
  const nextFocusableElement =
    currentElement.nextElementSibling as HTMLGuxAvatarOverflowItemBetaElement;

  if (nextFocusableElement) {
    void nextFocusableElement.focus();
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
