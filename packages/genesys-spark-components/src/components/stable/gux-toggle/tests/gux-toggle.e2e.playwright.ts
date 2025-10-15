import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-toggle.common';

test.describe('gux-toggle', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-toggle',
    disableAnimations: true
  });

  test.describe('User Interactions', () => {
    test('should not fire a check event when an enabled toggle is disabled and clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" disabled label="On"</gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(0);
    });

    test('should fire a check event when an enabled toggle is clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await slider.click();
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(1);
    });

    test('should check an unchecked toggle when clicked', async ({ page }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should uncheck a checked toggle when clicked', async ({ page }) => {
      const html = '<gux-toggle lang="en" checked label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not check an unchecked toggle when disabled and clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" disabled label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not uncheck a checked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked disabled label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should not check the toggle if preventDefault is called on the event', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await page.evaluate(() => {
        document.addEventListener('check', event => {
          event.preventDefault();
        });
      });

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });
  });

  test.describe('User Interactions (deprecated checked-label and unchecked-label)', () => {
    test('should not fire a check event when an enabled toggle is disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"</gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(0);
    });

    test('should fire a check event when an enabled toggle is clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await slider.click();
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(1);
    });

    test('should check an unchecked toggle when clicked', async ({ page }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should uncheck a checked toggle when clicked', async ({ page }) => {
      const html =
        '<gux-toggle lang="en" checked checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not check an unchecked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not uncheck a checked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should not check the toggle if preventDefault is called on the event', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await page.evaluate(() => {
        document.addEventListener('check', event => {
          event.preventDefault();
        });
      });

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });
  });

  test.describe('testing aria-label functionality', () => {
    test('should set aria-label on toggle slider when label is provided on gux-toggle', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" label="Dark Mode"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider .gux-toggle-slider');
      await expect(slider).toHaveAttribute('aria-label', 'Dark Mode');
    });

    test('should update aria-label when label changes', async ({ page }) => {
      const html = '<gux-toggle lang="en" label="Dark Mode"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider .gux-toggle-slider');

      await expect(slider).toHaveAttribute('aria-label', 'Dark Mode');

      await toggle.evaluate((el: HTMLGuxToggleElement) => {
        el.label = 'Light Mode';
      });
      await page.waitForChanges();

      await expect(slider).toHaveAttribute('aria-label', 'Light Mode');
    });
  });
});
