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

function getIndexById(
  root: HTMLElement,
  validFocusableItems: string[],
  id: string
): number {
  return getGuxListFocusableItems(root, validFocusableItems).findIndex(
    cv => cv.id === id
  );
}

function getClosestIndexById(
  root: HTMLElement,
  validFocusableItems: string[],
  startOfIdString: string
): number {
  const index = getGuxListFocusableItems(root, validFocusableItems).findIndex(
    cv => cv.id.startsWith(startOfIdString)
  );

  if (index >= 0) {
    return index;
  }

  return getClosestIndexById(
    root,
    validFocusableItems,
    startOfIdString.slice(0, -1)
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

  // This is needed to ensure avatar overflow items can be navigated in a list
  if (items[focusIndex].tagName === 'GUX-AVATAR-OVERFLOW-BETA') {
    const overflowItem = items[focusIndex] as HTMLGuxAvatarOverflowBetaElement;
    overflowItem.guxFocus();
    return;
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

export function byId(
  root: HTMLElement,
  validFocusableItems: string[],
  id: string
): void {
  const index = getIndexById(root, validFocusableItems, id);

  if (index >= 0) {
    focusIndex(root, validFocusableItems, index);
  } else {
    focusIndex(root, validFocusableItems, 0);
  }
}

export function byClosestId(
  root: HTMLElement,
  validFocusableItems: string[],
  id: string
): void {
  const index = getClosestIndexById(root, validFocusableItems, id);

  if (index >= 0) {
    focusIndex(root, validFocusableItems, index);
  } else {
    focusIndex(root, validFocusableItems, 0);
  }
}
