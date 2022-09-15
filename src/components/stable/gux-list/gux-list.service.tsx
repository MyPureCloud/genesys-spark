function getRootChildren(root: HTMLElement): Element[] {
  const slot = root.querySelector('slot');

  return slot ? slot.assignedElements() : Array.from(root.children);
}

function getGuxListFocusableItems(
  root: HTMLElement,
  validFocusableItems: string[]
): HTMLElement[] {
  return getRootChildren(root).filter(cv => {
    if (validFocusableItems.includes(cv.tagName.toLowerCase())) {
      return !(cv as HTMLOptionElement).disabled;
    }

    return false;
  }) as HTMLElement[];
}

function getCurrentFocusIndex(
  root: HTMLElement,
  validFocusableItems: string[]
): number {
  return getGuxListFocusableItems(root, validFocusableItems).findIndex(cv =>
    cv.matches(':focus-within')
  );
}

export function focusMove(
  root: HTMLElement,
  validFocusableItems: string[],
  delta: number
) {
  const currentFocusIndex = getCurrentFocusIndex(root, validFocusableItems);
  const maxIndex = getGuxListFocusableItems(root, validFocusableItems).length;

  focusIndex(root, validFocusableItems, (currentFocusIndex + delta) % maxIndex);
}

function focusIndex(
  root: HTMLElement,
  validFocusableItems: string[],
  focusIndex: number
) {
  const items = getGuxListFocusableItems(root, validFocusableItems);

  while (focusIndex < 0) {
    focusIndex += items.length;
  }

  items[focusIndex]?.focus();
}

function getLastChildIndex(
  root: HTMLElement,
  validFocusableItems: string[]
): number {
  return getGuxListFocusableItems(root, validFocusableItems).length - 1;
}

export function first(root: HTMLElement, validFocusableItems: string[]): void {
  focusIndex(root, validFocusableItems, 0);
}

export function last(root: HTMLElement, validFocusableItems: string[]): void {
  focusIndex(
    root,
    validFocusableItems,
    getLastChildIndex(root, validFocusableItems)
  );
}

export function next(root: HTMLElement, validFocusableItems: string[]): void {
  focusMove(root, validFocusableItems, 1);
}

export function previous(
  root: HTMLElement,
  validFocusableItems: string[]
): void {
  focusMove(root, validFocusableItems, -1);
}
