import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-icon.common';

test.describe('gux-icon', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-icon'
  });

  test.describe('accessibility', () => {
    test('should set aria-hidden="true" for decorative icons', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-icon icon-name="add" decorative></gux-icon>'
      );

      const svg = page.locator('gux-icon svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('should set aria-label for non-decorative icons with screenreader text', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-icon icon-name="add" screenreader-text="Add item"></gux-icon>'
      );

      const svg = page.locator('gux-icon svg');
      await expect(svg).toHaveAttribute('aria-label', 'Add item');
      await expect(svg).toHaveAttribute('aria-hidden', 'false');
    });

    test('should set role="img" on svg element', async ({ page }) => {
      await setContent(
        page,
        '<gux-icon icon-name="add" decorative></gux-icon>'
      );

      const svg = page.locator('gux-icon svg');
      await expect(svg).toHaveAttribute('role', 'img');
    });
  });

  test.describe('property changes', () => {
    test('should update aria attributes when decorative property changes', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-icon icon-name="add" screenreader-text="Add item"></gux-icon>'
      );

      const icon = page.locator('gux-icon');
      const svg = page.locator('gux-icon svg');

      await expect(svg).toHaveAttribute('aria-hidden', 'false');
      await expect(svg).toHaveAttribute('aria-label', 'Add item');

      await icon.evaluate((element: HTMLGuxIconElement) => {
        element.decorative = true;
      });

      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('should update aria attributes when screenreader text changes', async ({
      page
    }) => {
      await setContent(
        page,
        '<gux-icon icon-name="add" screenreader-text="Add item"></gux-icon>'
      );

      const icon = page.locator('gux-icon');
      const svg = page.locator('gux-icon svg');

      await expect(svg).toHaveAttribute('aria-label', 'Add item');

      await icon.evaluate((element: HTMLGuxIconElement) => {
        element.screenreaderText = 'New item';
      });

      await expect(svg).toHaveAttribute('aria-label', 'New item');
    });
  });
});
