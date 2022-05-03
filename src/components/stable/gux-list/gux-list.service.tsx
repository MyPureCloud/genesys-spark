const validFocusableItems = ['gux-list-item'];

function getRootChildren(root: HTMLElement): Element[] {
  const slot = root.querySelector('slot');

  return slot ? slot.assignedElements() : Array.from(root.children);
}

function getGuxListFocusableItems(root: HTMLElement): HTMLGuxListItemElement[] {
  return getRootChildren(root).filter(cv => {
    if (validFocusableItems.includes(cv.tagName.toLowerCase())) {
      return !(cv as HTMLGuxListItemElement).disabled;
    }

    return false;
  }) as HTMLGuxListItemElement[];
}

function getCurrentFocusIndex(root: HTMLElement): number {
  return getGuxListFocusableItems(root).findIndex(cv =>
    cv.matches(':focus-within')
  );
}

function focusMove(root: HTMLElement, delta: number) {
  const currentFocusIndex = getCurrentFocusIndex(root);
  const maxIndex = getGuxListFocusableItems(root).length;

  focusIndex(root, (currentFocusIndex + delta) % maxIndex);
}

function focusIndex(root: HTMLElement, focusIndex: number) {
  const items = getGuxListFocusableItems(root);

  while (focusIndex < 0) {
    focusIndex += items.length;
  }

  items[focusIndex]?.focus();
}

function getLastChildIndex(root: HTMLElement): number {
  return getGuxListFocusableItems(root).length - 1;
}

export function first(root: HTMLElement): void {
  focusIndex(root, 0);
}

export function last(root: HTMLElement): void {
  focusIndex(root, getLastChildIndex(root));
}

export function next(root: HTMLElement): void {
  focusMove(root, 1);
}

export function previous(root: HTMLElement): void {
  focusMove(root, -1);
}
