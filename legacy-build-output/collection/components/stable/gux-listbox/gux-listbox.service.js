export function getListOptions(list) {
  return Array.from(list.children).filter(item => {
    return item.value;
  });
}
function getHoveredOption(list) {
  return getListOptions(list).find(option => option.hovered && !option.disabled && !option.filtered);
}
function getFirstSelectedOption(list) {
  return getListOptions(list).find(option => option.selected && !option.disabled && !option.filtered);
}
function getActiveOption(list) {
  return getListOptions(list).find(option => option.active);
}
function setActiveOption(list, element) {
  if (element) {
    getListOptions(list).forEach(option => {
      const active = (!option.disabled || !option.filtered) && option === element;
      option.active = active;
      if (active) {
        list.setAttribute('aria-activedescendant', option.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}
function getFirstOption(list) {
  let firstOption = getListOptions(list)[0];
  while (firstOption && (firstOption.disabled || firstOption.filtered)) {
    firstOption = firstOption.nextElementSibling;
  }
  return firstOption;
}
function getNextOption(list) {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling;
    while (nextOption && (nextOption.disabled || nextOption.filtered)) {
      nextOption = nextOption.nextElementSibling;
    }
    return nextOption;
  }
  return getFirstOption(list);
}
function getPreviousOption(list) {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling;
    while (previousOption &&
      (previousOption.disabled || previousOption.filtered)) {
      previousOption =
        previousOption.previousElementSibling;
    }
    return previousOption;
  }
  return getFirstOption(list);
}
function getLastOption(list) {
  const options = getListOptions(list);
  let lastOption = options[options.length - 1];
  while (lastOption && (lastOption.disabled || lastOption.filtered)) {
    lastOption = lastOption.previousElementSibling;
  }
  return lastOption;
}
function hasActiveOption(list) {
  return Boolean(getActiveOption(list));
}
export function getSearchOption(list, searchString) {
  return getListOptions(list).find(option => {
    return ((!option.disabled || !option.filtered) &&
      matchOption(option, searchString));
  });
}
function setSearchOptionActive(list, searchString) {
  const option = getSearchOption(list, searchString);
  if (option) {
    setActiveOption(list, option);
  }
}
export function clearActiveOptions(list) {
  getListOptions(list).forEach(option => {
    option.active = false;
  });
}
export function setInitialActiveOption(list) {
  setActiveOption(list, getHoveredOption(list) ||
    getFirstSelectedOption(list) ||
    getFirstOption(list));
}
export function hasPreviousOption(list) {
  if (hasActiveOption(list)) {
    let previousOption = getActiveOption(list)
      .previousElementSibling;
    while (previousOption &&
      (previousOption.disabled || previousOption.filtered)) {
      previousOption =
        previousOption.previousElementSibling;
    }
    return Boolean(previousOption);
  }
  return false;
}
export function hasNextOption(list) {
  if (hasActiveOption(list)) {
    let nextOption = getActiveOption(list)
      .nextElementSibling;
    while (nextOption && (nextOption.disabled || nextOption.filtered)) {
      nextOption = nextOption.nextElementSibling;
    }
    return Boolean(nextOption);
  }
  return false;
}
export function setFirstOptionActive(list) {
  setActiveOption(list, getFirstOption(list));
}
export function setNextOptionActive(list) {
  setActiveOption(list, getNextOption(list));
}
export function setPreviousOptionActive(list) {
  setActiveOption(list, getPreviousOption(list));
}
export function setLastOptionActive(list) {
  setActiveOption(list, getLastOption(list));
}
export function actOnActiveOption(list, handler) {
  if (hasActiveOption(list)) {
    handler(getActiveOption(list).value);
  }
}
export function onClickedOption(option, handler) {
  handler(option.value);
}
let timer;
let searchStringState = '';
// While there is less than 1s between keypresses that will be considered one search operation.
// After 1s the next keypress will be considered the start of a new search.
// This is a mimic/approximation of the native select elements functionality.
const continueSearchMaxInterval = 1000;
export function goToOption(list, letter) {
  clearTimeout(timer);
  searchStringState += letter;
  setSearchOptionActive(list, searchStringState);
  timer = setTimeout(() => {
    searchStringState = '';
  }, continueSearchMaxInterval);
}
export function matchOption(option, matchString) {
  //The text content needs to be trimmed as white space can occur around the textContent if options are populated asynchronously.
  return option.textContent
    .trim()
    .toLowerCase()
    .startsWith(matchString.toLowerCase());
}
