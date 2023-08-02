import { E2EElement, E2EPage } from '@stencil/core/testing';

export async function validateSelectedDate(
  element: E2EElement,
  expectedMonthAndYear: string,
  expectedDay: string
) {
  const selectedDate = await element.find('pierce/.gux-selected .gux-non-sr');
  const currentMonthAndYear = await element.find(
    'pierce/.gux-header-month-and-year'
  );
  expect(currentMonthAndYear.innerHTML).toBe(expectedMonthAndYear);
  expect(selectedDate.innerHTML).toBe(expectedDay);
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

export async function getContentDateElement(
  element: E2EElement,
  dateAsMonthDayYear: string
): Promise<E2EElement> {
  return await element.find(
    `pierce/.gux-content-date[data-date="${new Date(
      dateAsMonthDayYear
    ).getTime()}"]`
  );
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
