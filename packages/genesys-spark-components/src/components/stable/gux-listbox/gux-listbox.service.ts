import { ListboxOptionElement } from './options/option-types';
import { logError } from '../../../utils/error/log-error';

export function getListOptions(
  list: HTMLGuxListboxElement
): ListboxOptionElement[] {
  const listChildren = Array.from(list.children);

  const allOptions = listChildren.reduce((accumulator, child) => {
    let childOptions = [];

    if (isOptionGroup(child)) {
      childOptions = Array.from(child.children).filter(item => isOption(item));
    } else if (isOption(child)) {
      childOptions = [child];
    }

    return [...accumulator, ...childOptions] as ListboxOptionElement[];
  }, []);

  return allOptions as ListboxOptionElement[];
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
  const optionTypes = ['GUX-OPTION', 'GUX-OPTION-ICON'];
  return optionTypes.includes(item.tagName);
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

function getListOptionByLocation(
  list: HTMLGuxListboxElement,
  location: 'next' | 'previous' | 'first' | 'last'
): ListboxOptionElement {
  const availableOptionsList = getAvailableListOptions(list);
  const activeOptionIndex = hasActiveOption(list)
    ? availableOptionsList.indexOf(getActiveOption(list))
    : -1;

  switch (location) {
    case 'first':
      return availableOptionsList[0];
    case 'last':
      return availableOptionsList.slice(-1)[0];
    case 'previous':
      return hasActiveOption(list)
        ? availableOptionsList[activeOptionIndex - 1]
        : getListOptionByLocation(list, 'first');
    case 'next':
      return hasActiveOption(list)
        ? availableOptionsList[activeOptionIndex + 1]
        : getListOptionByLocation(list, 'first');
    default:
      logError(list, 'must include a valid location');
      return null;
  }
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
  setActiveOption(
    list,
    getFirstSelectedOption(list) || getListOptionByLocation(list, 'first')
  );
}

export function hasPreviousOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    return Boolean(getListOptionByLocation(list, 'previous'));
  }

  return false;
}

export function hasNextOption(list: HTMLGuxListboxElement): boolean {
  if (hasActiveOption(list)) {
    return Boolean(getListOptionByLocation(list, 'next'));
  }

  return false;
}

export function setFirstOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getListOptionByLocation(list, 'first'));
}

export function setNextOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getListOptionByLocation(list, 'next'));
}

export function setPreviousOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getListOptionByLocation(list, 'previous'));
}

export function setLastOptionActive(list: HTMLGuxListboxElement): void {
  setActiveOption(list, getListOptionByLocation(list, 'last'));
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
