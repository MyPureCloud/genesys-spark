import { ListboxOptionElement } from './options/option-types';

const validOptionTagNames = ['GUX-OPTION', 'GUX-OPTION-ICON'];

export function getListOptions(
  list: HTMLGuxListboxElement
): ListboxOptionElement[] {
  return (Array.from(list.children) as ListboxOptionElement[]).filter(item => {
    return item.value || item.value === '';
  });
}

function getHoveredOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  return getListOptions(list).find(
    option => option.hovered && !option.disabled && !option.filtered
  );
}

function getFirstSelectedOption(
  list: HTMLGuxListboxElement
): ListboxOptionElement {
  return getListOptions(list).find(
    option => option.selected && !option.disabled && !option.filtered
  );
}

function getActiveOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  return getListOptions(list).find(option => option.active);
}

function isSelectableOption(
  option: HTMLElement & { disabled?: boolean; filtered?: boolean }
): boolean {
  return (
    validOptionTagNames.includes(option.tagName) &&
    !option.disabled &&
    !option.filtered
  );
}

function setActiveOption(
  list: HTMLGuxListboxElement,
  element: ListboxOptionElement
): void {
  if (element) {
    getListOptions(list).forEach(option => {
      const active = isSelectableOption(option) && option === element;
      option.active = active;

      if (active) {
        list.setAttribute('aria-activedescendant', option.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}

function getFirstOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  let firstOption = getListOptions(list)[0];

  while (firstOption && !isSelectableOption(firstOption)) {
    firstOption = firstOption.nextElementSibling as ListboxOptionElement;
  }

  return firstOption;
}

function getNextOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling as ListboxOptionElement;

    while (nextOption && !isSelectableOption(nextOption)) {
      nextOption = nextOption.nextElementSibling as ListboxOptionElement;
    }

    return nextOption;
  }

  return getFirstOption(list);
}

function getPreviousOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling as ListboxOptionElement;

    while (previousOption && !isSelectableOption(previousOption)) {
      previousOption =
        previousOption.previousElementSibling as ListboxOptionElement;
    }

    return previousOption;
  }

  return getFirstOption(list);
}

function getLastOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  const options = getListOptions(list);

  let lastOption = options[options.length - 1];

  while (lastOption && !isSelectableOption(lastOption)) {
    lastOption = lastOption.previousElementSibling as ListboxOptionElement;
  }

  return lastOption;
}

function hasActiveOption(list: HTMLGuxListboxElement): boolean {
  return Boolean(getActiveOption(list));
}

export function getSearchOption(
  list: HTMLGuxListboxElement,
  searchString: string
): ListboxOptionElement {
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
      .previousElementSibling as ListboxOptionElement;

    while (previousOption && !isSelectableOption(previousOption)) {
      previousOption =
        previousOption.previousElementSibling as ListboxOptionElement;
    }

    return Boolean(previousOption);
  }

  return false;
}

export function hasNextOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling as ListboxOptionElement;

    while (nextOption && !isSelectableOption(nextOption)) {
      nextOption = nextOption.nextElementSibling as ListboxOptionElement;
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
  option: ListboxOptionElement,
  handler: (value: string) => void
): void {
  handler(option.value);
}

let timer: NodeJS.Timeout;
let searchStringState: string = '';
// While there is less than 1s between keypresses that will be considered one search operation.
// After 1s the next keypress will be considered the start of a new search.
// This is a mimic/approximation of the native select elements functionality.
const continueSearchMaxInterval = 1000;

export function goToOption(list: HTMLGuxListboxElement, letter: string): void {
  clearTimeout(timer);
  searchStringState += letter;

  setSearchOptionActive(list, searchStringState);

  timer = setTimeout(() => {
    searchStringState = '';
  }, continueSearchMaxInterval);
}

export function matchOption(
  option: ListboxOptionElement,
  matchString: string
): boolean {
  //The text content needs to be trimmed as white space can occur around the textContent if options are populated asynchronously.
  return option.textContent
    .trim()
    .toLowerCase()
    .startsWith(matchString.toLowerCase());
}
