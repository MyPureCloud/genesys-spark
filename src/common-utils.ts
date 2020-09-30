export function addClassToElements(
  elements: HTMLElement | HTMLElement[],
  className: string
) {
  const arr: HTMLElement[] = [].concat(elements || []);
  for (const el of arr) {
    el.classList.add(className);
  }
}

export function removeClassToElements(
  elements: HTMLElement | HTMLElement[],
  className: string
) {
  const arr: HTMLElement[] = [].concat(elements || []);
  for (const el of arr) {
    el.classList.remove(className);
  }
}

export function randomHTMLId(prefix = 'gux'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 10)}`;
}

/********************************************************
 * Date Utilities                                       *
 *                                                      *
 * Date formatting and parsing helpers, for ISO formats *
 * and human formats.                                   *
 ********************************************************/

// ISO UTILS

// Converts a Date to ISO-8601 compliant format YYYY-MM-DD
export function asIsoDateString(date: Date): string {
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateStr = date.getDate().toString().padStart(2, '0');
  return `${date.getFullYear()}-${monthStr}-${dateStr}`;
}

// Converts two dates to an ISO-8601 compliant range (gauranteed to be sorted)
export function asIsoDateRange(date1: Date, date2: Date) {
  const [start, end] = sortDates([date1, date2]);
  return `${asIsoDateString(start)}/${asIsoDateString(end)}`;
}

// Converts ISO-8601 compliant format YYYY-MM-DD to Date
export function fromIsoDateString(isostr: string): Date {
  const [yearStr, monthStr, dayStr] = isostr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // zero-indexed month
  const day = parseInt(dayStr, 10);
  return new Date(year, month, day);
}

// Converts ISO-8601 compliant range format YYYY-MM-DD/YYYY-MM-DD to [Date, Date]
export function fromIsoDateRange(isostr: string): [Date, Date] {
  const [startStr, endStr] = isostr.split('/');
  return [fromIsoDateString(startStr), fromIsoDateString(endStr)];
}

function sortDates(dates: Date[]): Date[] {
  return dates.sort((d1, d2) => {
    return d1 < d2 ? -1 : 1;
  });
}

export default function onHiddenChange(
  element: HTMLElement,
  callback: (hidden: boolean) => void
) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      callback(element.hidden);
    });
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ['hidden']
  });
}

/********************************************************
 * Time Utilities                                       *
 *                                                      *
 * Time parsing and comparison, for ISO 8601 hh:mm:ss   *
 ********************************************************/

// Format should always adhere to: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
const DATE_STRING_PREFIX: string = '1978-09-23T';
const DATE_STRING_POSTFIX: string = 'Z'; // always use UTC

/**
 * converts ISO 24hr time to a date that can be used for comparison
 * with other times converted with this function.
 */
export function fromIsoTimeString(timeStr: string): Date {
  return new Date(DATE_STRING_PREFIX + timeStr.trim() + DATE_STRING_POSTFIX);
}

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
