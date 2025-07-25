import {
  test,
  setContent,
  expect,
  runAxe,
  E2EPage,
  checkRenders
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-button-multi.common';

async function clickDropdownButton(page: E2EPage): Promise<void> {
  const dropdownButton = page.locator('.gux-dropdown-button button');
  // eslint-disable-next-line playwright/no-force-option
  await dropdownButton.click({ force: true });
}

async function pressDropdownButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const dropdownButton = page.locator('.gux-dropdown-button button');
  await dropdownButton.press(keypress);
}

async function pressActionItemButton(
  page: E2EPage,
  keypress: string
): Promise<void> {
  const actionItemButton = page.locator('gux-list-item button').first();
  await actionItemButton.press(keypress);
}

test.describe('gux-button-multi', () => {
  test.describe('gux-button-multi', () => {
    checkRenders({ renderConfigs, element: 'gux-button-multi' });
  });

  test('should fire open and close events if not disabled on click', async ({
    page
  }) => {
    await setContent(page, renderConfigs[0].html);

    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await clickDropdownButton(page);
    await clickDropdownButton(page);

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'After clicking the dropdown button'
    });

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  test('should fire open and close events if not disabled using the keyboard', async ({
    page
  }) => {
    await setContent(page, renderConfigs[0].html);

    const onOpen = await page.spyOnEvent('open');
    const onClose = await page.spyOnEvent('close');

    await pressDropdownButton(page, 'Space');
    await pressActionItemButton(page, 'Escape');

    expect(onOpen).toHaveReceivedEventTimes(1);
    expect(onClose).toHaveReceivedEventTimes(1);
  });

  test('should not fire open event if disabled on click', async ({ page }) => {
    await setContent(page, renderConfigs[0].html);

    const onOpen = await page.spyOnEvent('open');
    const element = page.locator('gux-button-multi');

    await element.evaluate((el: HTMLGuxButtonMultiElement) => {
      el.disabled = true;
    });

    await clickDropdownButton(page);

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'After clicking the disabled dropdown button'
    });

    expect(onOpen).toHaveReceivedEventTimes(0);
  });

  test('should not fire open event if disabled using the keyboard', async ({
    page
  }) => {
    await setContent(page, renderConfigs[0].html);

    const onOpen = await page.spyOnEvent('open');
    const element = page.locator('gux-button-multi');

    await element.evaluate((el: HTMLGuxButtonMultiElement) => {
      el.disabled = true;
    });
    await page.waitForChanges();

    await pressDropdownButton(page, 'ArrowDown');

    expect(onOpen).toHaveReceivedEventTimes(0);
  });
});
