import { Temporal } from '@js-temporal/polyfill';
import { E2EElement, E2EPage } from '@stencil/core/testing';

export async function validateSelectedDate(
  element: E2EElement,
  expectedDate: string
) {
  const selectedDayElement = await findSelectedDayElement(element);
  await validateDate(selectedDayElement, expectedDate);
}

export async function validateHeaderMonth(
  element: E2EElement,
  expectedMonthAndYear: string
) {
  const currentMonthAndYear = await element.find(
    'pierce/.gux-header-month-and-year'
  );
  expect(currentMonthAndYear.innerHTML).toBe(expectedMonthAndYear);
}

export async function findSelectedDayElement(
  element: E2EElement
): Promise<E2EElement> {
  const selectedFocusProxy = await element.find(
    'pierce/gux-focus-proxy[aria-current="true"]'
  );
  return selectedFocusProxy.find('gux-day-beta');
}

export async function validateFocusedDay(
  element: E2EElement,
  expectedDate: string
): Promise<void> {
  const focusedElement = await element.find('pierce/:focus');
  await validateDate(focusedElement, expectedDate);
}

export async function findDayElement(
  element: E2EElement,
  isoDate: string
): Promise<E2EElement> {
  console.log(`Finding day element for: ${isoDate}`);
  return await element.find(`pierce/slot[name="${isoDate}"] gux-day-beta`);
}

export async function goToPreviousMonth(
  element: E2EElement,
  page: E2EPage
): Promise<void> {
  const button = await element.find('pierce/.gux-left');
  await button.click();
  return await page.waitForChanges();
}

export async function goToNextMonth(
  element: E2EElement,
  page: E2EPage
): Promise<void> {
  const button = await element.find('pierce/.gux-right');
  await button.click();
  return await page.waitForChanges();
}

async function validateDate(
  element: E2EElement,
  expectedDate: string
): Promise<void> {
  const expectedLabel = Temporal.PlainDate.from(expectedDate).toLocaleString(
    'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
  const labelElement = await element.find('pierce/.gux-sr-only');
  expect(labelElement.textContent).toBe(expectedLabel);
}
