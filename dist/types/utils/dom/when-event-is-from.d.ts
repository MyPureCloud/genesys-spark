/********************************************************
 * DOM/Event Utilities                                  *
 *                                                      *
 * Helpers for components                               *
 ********************************************************/
/**
 * Checks to see if an event originated within an element matching a specific selector and
 * if it did, passes the element to a handler function and returns the handler's result.
 */
export declare function whenEventIsFrom<T>(selector: string, event: Event, handler: (element: HTMLElement) => T): T | null;
