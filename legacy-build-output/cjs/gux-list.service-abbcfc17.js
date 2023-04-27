'use strict';

function getRootChildren(root) {
  const slot = root.querySelector('slot');
  return slot ? slot.assignedElements() : Array.from(root.children);
}
function getGuxListFocusableItems(root, validFocusableItems) {
  return getRootChildren(root).filter(cv => {
    if (validFocusableItems.includes(cv.tagName.toLowerCase())) {
      return !cv.disabled;
    }
    return false;
  });
}
function getCurrentFocusIndex(root, validFocusableItems) {
  return getGuxListFocusableItems(root, validFocusableItems).findIndex(cv => cv.matches(':focus-within'));
}
function getIndexById(root, validFocusableItems, id) {
  return getGuxListFocusableItems(root, validFocusableItems).findIndex(cv => cv.id === id);
}
function getClosestIndexById(root, validFocusableItems, startOfIdString) {
  const index = getGuxListFocusableItems(root, validFocusableItems).findIndex(cv => cv.id.startsWith(startOfIdString));
  if (index >= 0) {
    return index;
  }
  return getClosestIndexById(root, validFocusableItems, startOfIdString.slice(0, -1));
}
function focusMove(root, validFocusableItems, delta) {
  const currentFocusIndex = getCurrentFocusIndex(root, validFocusableItems);
  const maxIndex = getGuxListFocusableItems(root, validFocusableItems).length;
  focusIndex(root, validFocusableItems, (currentFocusIndex + delta) % maxIndex);
}
function focusIndex(root, validFocusableItems, focusIndex) {
  var _a;
  const items = getGuxListFocusableItems(root, validFocusableItems);
  while (focusIndex < 0) {
    focusIndex += items.length;
  }
  (_a = items[focusIndex]) === null || _a === void 0 ? void 0 : _a.focus();
}
function getLastChildIndex(root, validFocusableItems) {
  return getGuxListFocusableItems(root, validFocusableItems).length - 1;
}
function first(root, validFocusableItems) {
  focusIndex(root, validFocusableItems, 0);
}
function last(root, validFocusableItems) {
  focusIndex(root, validFocusableItems, getLastChildIndex(root, validFocusableItems));
}
function next(root, validFocusableItems) {
  focusMove(root, validFocusableItems, 1);
}
function previous(root, validFocusableItems) {
  focusMove(root, validFocusableItems, -1);
}
function byId(root, validFocusableItems, id) {
  const index = getIndexById(root, validFocusableItems, id);
  if (index >= 0) {
    focusIndex(root, validFocusableItems, index);
  }
  else {
    focusIndex(root, validFocusableItems, 0);
  }
}
function byClosestId(root, validFocusableItems, id) {
  const index = getClosestIndexById(root, validFocusableItems, id);
  if (index >= 0) {
    focusIndex(root, validFocusableItems, index);
  }
  else {
    focusIndex(root, validFocusableItems, 0);
  }
}

exports.byClosestId = byClosestId;
exports.byId = byId;
exports.first = first;
exports.focusMove = focusMove;
exports.last = last;
exports.next = next;
exports.previous = previous;
