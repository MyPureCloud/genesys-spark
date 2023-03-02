/********************************************************
 * DOM/Event Utilities                                  *
 *                                                      *
 * Helpers for components                               *
 ********************************************************/

/**
 * Checks to see if an event originated within an element matching a specific selector and
 * if it did, passes the element to a handler function and returns the handler's result.
 */
export function whenEventIsFrom<T>(
  selector: string,
  event: Event,
  handler: (element: HTMLElement) => T
): T | null {
  // Don't search for matches above the node where we captured the event;
  const exitTarget = event.currentTarget as HTMLElement;
  // Start with the oringal event target
  let checkTarget = event.target as HTMLElement;
  while (checkTarget !== exitTarget && checkTarget !== null) {
    if (checkTarget.matches(selector)) {
      return handler(checkTarget);
    } else {
      checkTarget = checkTarget.parentElement;
    }
  }
  return null;
}
