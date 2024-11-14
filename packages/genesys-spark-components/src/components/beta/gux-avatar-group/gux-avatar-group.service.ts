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

export function resetFocusableSiblings(element: Element) {
  const focusableSiblings = getSiblings(element).filter((sibling: Element) => {
    const button = getGroupItemButton(sibling);
    return button && button.tabIndex !== -1;
  });

  focusableSiblings.forEach((sibling: Element) => {
    const button = getGroupItemButton(sibling);
    if (button) {
      button.tabIndex = -1;
    }
  });
}

function focusFirstSibling(currentElement: Element): void {
  const firstFocusableElement = getFirstFocusableElement(
    currentElement
  ) as HTMLGuxAvatarGroupItemBetaElement;

  if (firstFocusableElement) {
    void firstFocusableElement.guxFocus();
    void setTabIndex(firstFocusableElement, 0);
    void resetFocusableSiblings(firstFocusableElement);
  }
}

function focusLastSibling(currentElement: Element): void {
  const lastFocusableElement = getLastFocusableElement(
    currentElement
  ) as HTMLGuxAvatarGroupItemBetaElement;

  if (lastFocusableElement) {
    void lastFocusableElement.guxFocus();
    void setTabIndex(lastFocusableElement, 0);
    void resetFocusableSiblings(lastFocusableElement);
  }
}

function focusPreviousSiblingLoop(currentElement: Element): void {
  const previousFocusableElement =
    currentElement.previousElementSibling as HTMLGuxAvatarGroupItemBetaElement;

  setTabIndex(currentElement, -1);

  if (previousFocusableElement) {
    void previousFocusableElement.guxFocus();
    void setTabIndex(previousFocusableElement, 0);
  } else {
    focusLastSibling(currentElement);
  }
}

function focusNextSiblingLoop(currentElement: Element): void {
  const nextFocusableElement =
    currentElement.nextElementSibling as HTMLGuxAvatarGroupItemBetaElement;
  setTabIndex(currentElement, -1);

  if (nextFocusableElement) {
    void nextFocusableElement.guxFocus();
    void setTabIndex(nextFocusableElement, 0);
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
  return element.shadowRoot.querySelector('button') as HTMLButtonElement;
}

function getSiblings(element: Element) {
  const parentGroup = element.parentElement as HTMLGuxAvatarGroupBetaElement;
  const currentElementIndex = Array.from(parentGroup.children).indexOf(element);
  return Array.from(parentGroup.children).filter(
    (_, index) => index !== currentElementIndex
  ) as Element[];
}

function setTabIndex(element: Element, newIndex: number) {
  const button = getGroupItemButton(element);
  console.log(button);
  if (button) {
    button.tabIndex = newIndex;
  } else {
    console.log('No button found in the gux-avatar-group-item element');
  }
}
