import { ListboxOptionElement } from './options/option-types';

export function getListOptions(
  list: HTMLGuxListboxElement
): ListboxOptionElement[] {
  const listChildren = Array.from(list.children);

  const allOptions = [];
  listChildren.map(child => {
    if (isOptionGroup(child)) return allOptions.push(...child.children);
    return allOptions.push(child);
  });

  return (allOptions as ListboxOptionElement[]).filter(item => {
    return item.value || item.value === '';
  });
}

export function isOptionGroup(item: Element): boolean {
  return item.tagName === 'GUX-OPTION-GROUP';
}

export function hasOptionGroups(list: HTMLGuxListboxElement): boolean {
  return Array.from(list.children).some(child => isOptionGroup(child));
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

function setActiveOption(
  list: HTMLGuxListboxElement,
  element: ListboxOptionElement
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

function getSiblingForGroupedList(
  list: HTMLGuxListboxElement,
  location: 'next' | 'previous' | 'first' | 'last'
): ListboxOptionElement {
  const availableOptionsList = getListOptions(list).filter(
    option => !option.disabled && !option.filtered
  );
  const activeOption = getActiveOption(list);
  const activeOptionIndex = availableOptionsList.indexOf(activeOption);

  switch (location.toUpperCase()) {
    case 'FIRST':
      return availableOptionsList[0];
    case 'LAST':
      return availableOptionsList[availableOptionsList.length - 1];
    case 'PREVIOUS':
      return availableOptionsList[activeOptionIndex - 1];
    default:
      return availableOptionsList[activeOptionIndex + 1];
  }
}

function getFirstOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  let firstOption: ListboxOptionElement = getListOptions(list)[0];

  if (hasOptionGroups(list)) {
    firstOption = getSiblingForGroupedList(list, 'first');
  } else {
    while (firstOption && (firstOption.disabled || firstOption.filtered)) {
      firstOption = firstOption.nextElementSibling as ListboxOptionElement;
    }
  }
  return firstOption;
}

function getNextOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list)) {
    const activeOption = getActiveOption(list);
    let nextOption: ListboxOptionElement;
    if (hasOptionGroups(list)) {
      nextOption = getSiblingForGroupedList(list, 'next');
    } else {
      nextOption = activeOption.nextElementSibling as ListboxOptionElement;

      while (nextOption && (nextOption.disabled || nextOption.filtered)) {
        nextOption = nextOption.nextElementSibling as ListboxOptionElement;
      }
    }

    return nextOption;
  }

  return getFirstOption(list);
}

function getPreviousOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list)) {
    const activeOption = getActiveOption(list);
    let previousOption: ListboxOptionElement;
    if (hasOptionGroups(list)) {
      previousOption = getSiblingForGroupedList(list, 'previous');
    } else {
      previousOption =
        activeOption.previousElementSibling as ListboxOptionElement;

      while (
        previousOption &&
        (previousOption.disabled || previousOption.filtered)
      ) {
        previousOption =
          previousOption.previousElementSibling as ListboxOptionElement;
      }
    }

    return previousOption;
  }

  return getFirstOption(list);
}

function getLastOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  const options = getListOptions(list);
  let lastOption: ListboxOptionElement = options[options.length - 1];
  if (hasOptionGroups(list)) {
    lastOption = getSiblingForGroupedList(list, 'last');
  } else {
    while (lastOption && (lastOption.disabled || lastOption.filtered)) {
      lastOption = lastOption.previousElementSibling as ListboxOptionElement;
    }
  }

  return lastOption;
}

export function hasActiveOption(list: HTMLGuxListboxElement): boolean {
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
  setActiveOption(list, getFirstSelectedOption(list) || getFirstOption(list));
}

export function hasPreviousOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    const activeOption = getActiveOption(list);
    let previousOption: ListboxOptionElement;
    if (hasOptionGroups(list)) {
      previousOption = getSiblingForGroupedList(list, 'previous');
    } else {
      previousOption =
        activeOption.previousElementSibling as ListboxOptionElement;

      while (
        previousOption &&
        (previousOption.disabled || previousOption.filtered)
      ) {
        previousOption =
          previousOption.previousElementSibling as ListboxOptionElement;
      }
    }

    return Boolean(previousOption);
  }

  return false;
}

export function hasNextOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    const activeOption = getActiveOption(list);
    let nextOption: ListboxOptionElement;
    if (hasOptionGroups(list)) {
      nextOption = getSiblingForGroupedList(list, 'next');
    } else {
      nextOption = activeOption.nextElementSibling as ListboxOptionElement;

      while (nextOption && (nextOption.disabled || nextOption.filtered)) {
        nextOption = nextOption.nextElementSibling as ListboxOptionElement;
      }
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
