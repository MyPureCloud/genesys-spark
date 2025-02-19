import { getClosestElement } from '@utils/dom/get-closest-element';
import { GuxAvatarGroupChild } from './gux-avatar-group.types';
import { logWarn } from '@utils/error/log-error';

export function groupKeyboardNavigation(
  event: KeyboardEvent,
  currentElement: Element
): void {
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.stopPropagation();
      event.preventDefault();

      focusPreviousSiblingLoop(currentElement);
      break;

    case 'ArrowRight':
    case 'ArrowDown':
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
  const focusableSibling = getGroupItems(element).find((sibling: Element) => {
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
  ) as GuxAvatarGroupChild;

  if (firstFocusableElement) {
    void firstFocusableElement.focus();
    void resetFocusableSibling(firstFocusableElement);
    void setItemTabIndex(firstFocusableElement, 0);
  }
}

function focusLastSibling(currentElement: Element): void {
  const lastFocusableElement = getLastFocusableElement(
    currentElement
  ) as GuxAvatarGroupChild;

  if (lastFocusableElement) {
    void lastFocusableElement.focus();
    void resetFocusableSibling(lastFocusableElement);
    void setItemTabIndex(lastFocusableElement, 0);
  }
}

function focusPreviousSiblingLoop(currentElement: Element): void {
  const groupItems = getGroupItems(currentElement);
  const currentElementIndex = groupItems.findIndex(
    (item: Element) => item === currentElement
  );

  const previousIndex = (currentElementIndex - 1) % groupItems.length;
  const previousFocusableElement = groupItems[
    previousIndex
  ] as GuxAvatarGroupChild;

  setItemTabIndex(currentElement, -1);

  if (previousFocusableElement) {
    void previousFocusableElement.focus();
    void setItemTabIndex(previousFocusableElement, 0);
  } else {
    focusLastSibling(currentElement);
  }
}

function focusNextSiblingLoop(currentElement: Element): void {
  const groupItems = getGroupItems(currentElement);
  const currentElementIndex = groupItems.findIndex(
    (item: Element) => item === currentElement
  );

  const nextIndex = (currentElementIndex + 1) % groupItems.length;
  if (nextIndex === 0) {
    focusFirstSibling(currentElement);
  }
  const nextFocusableElement = groupItems[nextIndex] as GuxAvatarGroupChild;

  setItemTabIndex(currentElement, -1);

  if (nextFocusableElement !== null) {
    void nextFocusableElement.focus();
    void setItemTabIndex(nextFocusableElement, 0);
  }
}

function getFirstFocusableElement(currentElement: Element): Element {
  return getGroupItems(currentElement)[0];
}

function getLastFocusableElement(currentElement: Element): Element {
  const groupItems = getGroupItems(currentElement);
  return groupItems[groupItems.length - 1];
}

function getGroupItemButton(element: Element): HTMLButtonElement {
  return element.shadowRoot?.querySelector('button') as HTMLButtonElement;
}

function getGroupItems(element: Element): Element[] {
  const group = getClosestElement(
    'gux-avatar-group-beta',
    element as HTMLElement
  ) as Element;

  const slottedItems = Array.from(
    group.querySelectorAll(
      'gux-avatar-group-item-beta, gux-avatar-group-add-item-beta'
    )
  ).filter(child => !isHidden(child)) as GuxAvatarGroupChild[];

  const overflow = group.shadowRoot.querySelector(
    'gux-avatar-overflow-beta'
  ) as HTMLGuxAvatarOverflowBetaElement;

  if (overflow) {
    const addToGroup = group.shadowRoot.querySelector(
      'gux-avatar-group-add-item-beta'
    ) as HTMLGuxAvatarGroupAddItemBetaElement;

    slottedItems.push(overflow);
    if (addToGroup) {
      slottedItems.push(addToGroup);
    }
  }

  return slottedItems as GuxAvatarGroupChild[];
}

function setItemTabIndex(element: Element, newIndex: number) {
  const button = getGroupItemButton(element);
  if (button) {
    button.tabIndex = newIndex;
  } else {
    logWarn(
      element as HTMLElement,
      'gux-avatar-group-beta: No button found in the element'
    );
  }
}
function isHidden(element: Element): boolean {
  return element.hasAttribute('hidden');
}
