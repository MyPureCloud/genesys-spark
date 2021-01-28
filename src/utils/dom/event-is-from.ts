/**
 * Checks to see if an event originated within an element matching a specific selector.
 */
export function eventIsFrom(selector: string, event: Event): boolean {
  // Don't search for matches above the node where we captured the event;
  const exitTarget = event.currentTarget as HTMLElement;
  // Start with the oringal event target
  let checkTarget = event.target as HTMLElement;
  while (checkTarget !== exitTarget && checkTarget !== null) {
    if (checkTarget.matches(selector)) {
      return true;
    } else {
      checkTarget = checkTarget.parentElement;
    }
  }
  return false;
}
