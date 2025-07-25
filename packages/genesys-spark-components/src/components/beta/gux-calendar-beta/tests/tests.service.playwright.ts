import { E2EPage } from '@stencil/playwright';
import { Locator } from 'playwright-core';
import { Temporal } from '@js-temporal/polyfill';
import { expect } from '@test/playwrightTestUtils';

export async function validateSelectedDate(
  page: E2EPage,
  expectedDate: string
) {
  const selectedDayElement = await findSelectedDayElement(page);
  await validateDate(selectedDayElement, expectedDate);
}

export async function validateHeaderMonth(
  page: E2EPage,
  expectedMonthAndYear: string
) {
  const currentMonthAndYearDescription = await page
    .locator('.gux-header-month-and-year')
    .textContent();
  expect(currentMonthAndYearDescription).toBe(expectedMonthAndYear);
}

export async function findSelectedDayElement(page: E2EPage): Promise<Locator> {
  return page.locator('gux-day-beta[aria-current="true"]');
}

export async function validateFocusedDay(
  page: E2EPage,
  expectedDate: string
): Promise<void> {
  const focusedElement = await page.locator(':focus').last();
  await validateDate(focusedElement, expectedDate);
}

export async function findDayElement(
  page: E2EPage,
  isoDate: string
): Promise<Locator> {
  return await page.locator(`.day-${isoDate}`);
}

export async function goToPreviousMonth(page: E2EPage): Promise<void> {
  const button = await page.locator('.gux-left');
  await button.click();
  return await page.waitForChanges();
}

export async function goToNextMonth(page: E2EPage): Promise<void> {
  const button = await page.locator('.gux-right');
  await button.click();
  return await page.waitForChanges();
}

async function validateDate(
  element: Locator,
  expectedDate: string
): Promise<void> {
  const expectedLabel = Temporal.PlainDate.from(expectedDate).toLocaleString(
    'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
  const labelElement = await element.locator('.gux-sr-only');
  expect(await labelElement.textContent()).toBe(expectedLabel);
}
