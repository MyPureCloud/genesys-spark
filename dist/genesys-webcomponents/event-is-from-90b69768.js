/**
 * Checks to see if an event originated within an element matching a specific selector.
 */
function eventIsFrom(selector, event) {
  // Don't search for matches above the node where we captured the event;
  const exitTarget = event.currentTarget;
  // Start with the oringal event target
  let checkTarget = event.target;
  while (checkTarget !== exitTarget && checkTarget !== null) {
    if (checkTarget.matches(selector)) {
      return true;
    }
    else {
      checkTarget = checkTarget.parentElement;
    }
  }
  return false;
}

export { eventIsFrom as e };
