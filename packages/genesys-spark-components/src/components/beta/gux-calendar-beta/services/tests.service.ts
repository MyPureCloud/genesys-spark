import { E2EElement, E2EPage } from '@stencil/core/testing';
import { asIsoDate } from '@utils/date/iso-dates';

export async function validateSelectedDate(
  element: E2EElement,
  expectedMonthAndYear: string,
  expectedDay: string
) {
  const currentMonthAndYear = await element.find(
    'pierce/.gux-header-month-and-year'
  );
  const selectedDate = await element.find(
    'pierce/gux-day[aria-current="true"]'
  );
  expect(currentMonthAndYear.innerHTML).toBe(expectedMonthAndYear);
  expect(selectedDate.shadowRoot).toEqualText(
    `<button type="button"><slot>${expectedDay}</slot></button>`
  );
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

export async function getSelectedDateElement(
  calendarElement: E2EElement
): Promise<E2EElement> {
  return calendarElement.find('pierce/[aria-current="true"]');
}

export async function getContentDateElement(
  element: E2EElement,
  dateAsMonthDayYear: string
): Promise<E2EElement> {
  const dateStr = asIsoDate(new Date(dateAsMonthDayYear));
  console.log('Finding: ');
  return await element.find(`pierce/slot[name="${dateStr}"] gux-day`);
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
