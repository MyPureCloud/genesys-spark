function getListOptions(list: HTMLGuxListboxElement): HTMLGuxOptionElement[] {
  return Array.from(list.children) as HTMLGuxOptionElement[];
}

function getHoveredOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  return getListOptions(list).find(
    option => option.hovered && !option.disabled && !option.filtered
  );
}

function getFirstSelectedOption(
  list: HTMLGuxListboxElement
): HTMLGuxOptionElement {
  return getListOptions(list).find(
    option => option.selected && !option.disabled && !option.filtered
  );
}

function getActiveOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  return getListOptions(list).find(option => option.active);
}

function setActiveOption(
  list: HTMLGuxListboxElement,
  element: HTMLGuxOptionElement
): void {
  if (element) {
    getListOptions(list).forEach(option => {
      const active =
        (!option.disabled || !option.filtered) && option === element;
      option.active = active;

      if (active) {
        list.setAttribute('aria-activedescendant', option.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}

function getFirstOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  let firstOption = getListOptions(list)[0];

  while (firstOption && (firstOption.disabled || firstOption.filtered)) {
    firstOption = firstOption.nextElementSibling as HTMLGuxOptionElement;
  }

  return firstOption;
}

function getNextOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling as HTMLGuxOptionElement;

    while (nextOption && (nextOption.disabled || nextOption.filtered)) {
      nextOption = nextOption.nextElementSibling as HTMLGuxOptionElement;
    }

    return nextOption;
  }

  return getFirstOption(list);
}

function getPreviousOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling as HTMLGuxOptionElement;

    while (
      previousOption &&
      (previousOption.disabled || previousOption.filtered)
    ) {
      previousOption =
        previousOption.previousElementSibling as HTMLGuxOptionElement;
    }

    return previousOption;
  }

  return getFirstOption(list);
}

function getLastOption(list: HTMLGuxListboxElement): HTMLGuxOptionElement {
  const options = getListOptions(list);

  let lastOption = options[options.length - 1];

  while (lastOption && (lastOption.disabled || lastOption.filtered)) {
    lastOption = lastOption.previousElementSibling as HTMLGuxOptionElement;
  }

  return lastOption;
}

function hasActiveOption(list: HTMLGuxListboxElement): boolean {
  return Boolean(getActiveOption(list));
}

export function getSearchOption(
  list: HTMLGuxListboxElement,
  searchString: string
): HTMLGuxOptionElement {
  return getListOptions(list).find(option => {
    return (
      (!option.disabled || !option.filtered) &&
      matchOption(option, searchString)
    );
  });
}

function setSearchOptionActive(
  list: HTMLGuxListboxElement,
  searchString: string
): void {
  const option = getSearchOption(list, searchString);

  if (option) {
    setActiveOption(list, option);
  } else {
    clearActiveOptions(list);
  }
}

export function clearActiveOptions(list: HTMLGuxListboxElement): void {
  getListOptions(list).forEach(option => {
    option.active = false;
  });
}

export function setInitialActiveOption(list: HTMLGuxListboxElement) {
  setActiveOption(
    list,
    getHoveredOption(list) ||
      getFirstSelectedOption(list) ||
      getFirstOption(list)
  );
}

export function hasPreviousOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling as HTMLGuxOptionElement;

    while (
      previousOption &&
      (previousOption.disabled || previousOption.filtered)
    ) {
      previousOption =
        previousOption.previousElementSibling as HTMLGuxOptionElement;
    }

    return Boolean(previousOption);
  }

  return false;
}

export function hasNextOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling as HTMLGuxOptionElement;

    while (nextOption && (nextOption.disabled || nextOption.filtered)) {
      nextOption = nextOption.nextElementSibling as HTMLGuxOptionElement;
    }

    return Boolean(nextOption);
  }

  return false;
}

export function setFirstOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getFirstOption(list));
}

export function setNextOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getNextOption(list));
}

export function setPreviousOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getPreviousOption(list));
}

export function setLastOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getLastOption(list));
}

export function actOnActiveOption(
  list: HTMLGuxListboxElement,
  handler: (value: string) => void
): void {
  if (hasActiveOption(list)) {
    handler(getActiveOption(list).value);
  }
}

export function onClickedOption(
  option: HTMLGuxOptionElement,
  handler: (value: string) => void
): void {
  handler(option.value);
}

let timer: NodeJS.Timeout;
let searchStringState: string = '';
const searchDebounceInterval = 250;

export function goToOption(list: HTMLGuxListboxElement, letter: string): void {
  clearTimeout(timer);
  searchStringState += letter;

  timer = setTimeout(() => {
    setSearchOptionActive(list, searchStringState);
    searchStringState = '';
  }, searchDebounceInterval);
}

export function matchOption(
  option: HTMLGuxOptionElement,
  matchString: string
): boolean {
  //The text content needs to be trimmed as white space can occur around the textContent if options are populated asynchronously.
  return option.textContent
    .trim()
    .toLowerCase()
    .startsWith(matchString.toLowerCase());
}
