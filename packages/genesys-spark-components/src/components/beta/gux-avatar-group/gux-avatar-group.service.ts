export function groupKeyboardNavigation(
  event: KeyboardEvent,
  currentElement: Element
): void {
  switch (event.key) {
    case 'ArrowLeft':
      event.stopPropagation();
      event.preventDefault();

      focusPreviousSiblingLoop(currentElement);
      break;

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

export function resetFocusableSibling(element: Element) {
  const focusableSibling = getSiblings(element).find((sibling: Element) => {
    const button = getGroupItemButton(sibling);
    return button && button.tabIndex !== -1;
  });

  if (focusableSibling) {
    setItemTabIndex(focusableSibling, -1);
  }
}

export function setFocusTarget(element: Element): void {
  setItemTabIndex(element, 0);
}

function focusFirstSibling(currentElement: Element): void {
  const firstFocusableElement = getFirstFocusableElement(
    currentElement
  ) as HTMLGuxAvatarGroupItemBetaElement;

  if (firstFocusableElement) {
    void firstFocusableElement.guxFocus();
    void setItemTabIndex(firstFocusableElement, 0);
    void resetFocusableSibling(firstFocusableElement);
  }
}

function focusLastSibling(currentElement: Element): void {
  const lastFocusableElement = getLastFocusableElement(
    currentElement
  ) as HTMLGuxAvatarGroupItemBetaElement;

  if (lastFocusableElement) {
    void lastFocusableElement.guxFocus();
    void setItemTabIndex(lastFocusableElement, 0);
    void resetFocusableSibling(lastFocusableElement);
  }
}

function focusPreviousSiblingLoop(currentElement: Element): void {
  const previousFocusableElement =
    currentElement.previousElementSibling as HTMLGuxAvatarGroupItemBetaElement;

  setItemTabIndex(currentElement, -1);

  if (previousFocusableElement) {
    void previousFocusableElement.guxFocus();
    void setItemTabIndex(previousFocusableElement, 0);
  } else {
    focusLastSibling(currentElement);
  }
}

function focusNextSiblingLoop(currentElement: Element): void {
  const nextFocusableElement =
    currentElement.nextElementSibling as HTMLGuxAvatarGroupItemBetaElement;
  setItemTabIndex(currentElement, -1);

  if (nextFocusableElement) {
    void nextFocusableElement.guxFocus();
    void setItemTabIndex(nextFocusableElement, 0);
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

function getGroupItemButton(element: Element): HTMLButtonElement {
  return element.shadowRoot?.querySelector('button') as HTMLButtonElement;
}

function getSiblings(element: Element): Element[] {
  const siblings = Array.from(element.parentElement.children);

  // Early return for performance when there are no siblings
  if (siblings.length <= 1) {
    return [];
  }

  return siblings.filter(child => child !== element);
}

function setItemTabIndex(element: Element, newIndex: number) {
  const button = getGroupItemButton(element);
  if (button) {
    button.tabIndex = newIndex;
  } else {
    console.log('No button found in the gux-avatar-group-item element');
  }
}
