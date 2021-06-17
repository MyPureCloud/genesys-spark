function getListOptions(list: HTMLGuxListboxElement): HTMLGuxOptionV2Element[] {
  return Array.from(list.children) as HTMLGuxOptionV2Element[];
}

function getFirstSelectedOption(
  list: HTMLGuxListboxElement
): HTMLGuxOptionV2Element {
  return getListOptions(list).find(
    option => option.selected && !option.disabled
  );
}

function getActiveOption(list: HTMLGuxListboxElement): HTMLGuxOptionV2Element {
  return getListOptions(list).find(option => option.active);
}

function setActiveOption(
  list: HTMLGuxListboxElement,
  element: HTMLGuxOptionV2Element
): void {
  if (element) {
    getListOptions(list).forEach(option => {
      const active = !option.disabled && option === element;
      option.active = active;

      if (active) {
        list.setAttribute('aria-activedescendant', option.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}

function getFirstOption(list: HTMLGuxListboxElement): HTMLGuxOptionV2Element {
  let firstOption = getListOptions(list)[0];

  while (firstOption && firstOption.disabled) {
    firstOption = firstOption.nextElementSibling as HTMLGuxOptionV2Element;
  }

  return firstOption;
}

function getNextOption(list: HTMLGuxListboxElement): HTMLGuxOptionV2Element {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling as HTMLGuxOptionV2Element;

    while (nextOption && nextOption.disabled) {
      nextOption = nextOption.nextElementSibling as HTMLGuxOptionV2Element;
    }

    return nextOption;
  }

  return getFirstOption(list);
}

function getPreviousOption(
  list: HTMLGuxListboxElement
): HTMLGuxOptionV2Element {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling as HTMLGuxOptionV2Element;

    while (previousOption && previousOption.disabled) {
      previousOption =
        previousOption.previousElementSibling as HTMLGuxOptionV2Element;
    }

    return previousOption;
  }

  return getFirstOption(list);
}

function getLastOption(list: HTMLGuxListboxElement): HTMLGuxOptionV2Element {
  const options = getListOptions(list);

  let lastOption = options[options.length - 1];

  while (lastOption && lastOption.disabled) {
    lastOption = lastOption.previousElementSibling as HTMLGuxOptionV2Element;
  }

  return lastOption;
}

function hasActiveOption(list: HTMLGuxListboxElement): boolean {
  return Boolean(getActiveOption(list));
}

function getSearchOption(
  list: HTMLGuxListboxElement,
  searchString: string
): HTMLGuxOptionV2Element {
  return getListOptions(list).find(option => {
    return (
      !option.disabled &&
      option.textContent.toLowerCase().startsWith(searchString.toLowerCase())
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
  setActiveOption(list, getFirstSelectedOption(list) || getFirstOption(list));
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

export function onEnterList(
  list: HTMLGuxListboxElement,
  handler: (value: string) => void
): void {
  if (hasActiveOption(list)) {
    handler(getActiveOption(list).value);
  }
}

export function onClickedOption(
  option: HTMLGuxOptionV2Element,
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
