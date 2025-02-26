import { ListboxOptionElement } from './options/option-types';

export function getListOptions(
  list: HTMLGuxListboxElement
): ListboxOptionElement[] {
  const listChildren = Array.from(list.children);

  return listChildren.reduce((accumulator: ListboxOptionElement[], child) => {
    let childOptions = [];

    if (isOptionGroup(child)) {
      childOptions = Array.from(child.children).filter(item => isOption(item));
    } else if (isOption(child)) {
      childOptions = [child];
    }

    return [...accumulator, ...childOptions] as ListboxOptionElement[];
  }, []);
}

export function getAvailableListOptions(
  list: HTMLGuxListboxElement
): ListboxOptionElement[] {
  return getListOptions(list).filter(option => {
    return !option.disabled && !option.filtered;
  });
}

export function isOptionGroup(item: Element): boolean {
  return item.tagName === 'GUX-OPTION-GROUP-BETA';
}

export function isOption(item: Element): boolean {
  const optionTypes = ['GUX-OPTION', 'GUX-OPTION-ICON', 'GUX-OPTION-MULTI'];
  return optionTypes.includes(item.tagName);
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

function getFirstOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  return getAvailableListOptions(list)[0];
}

function getNextOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list) && getActiveOption(list) !== getLastOption(list)) {
    const availableListOptions = getAvailableListOptions(list);
    const activeOption = getActiveOption(list);
    const activeOptionIndex = availableListOptions.indexOf(activeOption);

    return availableListOptions[activeOptionIndex + 1];
  }

  return getFirstOption(list);
}

function getPreviousOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  if (hasActiveOption(list)) {
    const availableOptionsList = getAvailableListOptions(list);
    const activeOptionIndex = availableOptionsList.indexOf(
      getActiveOption(list)
    );

    if (getActiveOption(list) === getFirstOption(list)) {
      return getLastOption(list);
    }

    return availableOptionsList[activeOptionIndex - 1];
  }

  return getFirstOption(list);
}

function getLastOption(list: HTMLGuxListboxElement): ListboxOptionElement {
  const availableOptions = getAvailableListOptions(list);
  return availableOptions[availableOptions.length - 1];
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
    return Boolean(getPreviousOption(list));
  }

  return false;
}

export function hasNextOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    return Boolean(getNextOption(list));
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
// While there is less than 1s between key presses that will be considered one search operation.
// After 1s the next keypress will be considered the start of a new search.
// This is a mimic/approximation of the native select element`s functionality.
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
  return getOptionDefaultSlot(option)
    ?.textContent.trim()
    .toLowerCase()
    .startsWith(matchString.toLowerCase());
}

export function getOptionDefaultSlot(
  option: ListboxOptionElement
): Node | undefined {
  return option.shadowRoot.querySelector('slot')?.assignedNodes()[0];
}
