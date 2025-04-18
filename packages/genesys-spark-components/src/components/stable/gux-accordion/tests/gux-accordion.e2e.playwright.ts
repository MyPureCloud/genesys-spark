import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import AxeBuilder from '@axe-core/playwright';

test.describe('gux-accordion', () => {
  test('should render as expected', async ({ page }) => {
    // The path here is the path to the www output relative to the dev server root directory
    await page.goto(
      '/components/stable/gux-accordion/tests/gux-accordion.e2e.playwright.html'
    );

    expect(await page.screenshot()).toMatchSnapshot();
    const lightModeAccessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(lightModeAccessibilityScanResults.violations).toEqual([]);

    const html = page.getByTestId(`html`);
    await html.evaluate(element => element.setAttribute('flare-mode', 'dark'));

    expect(await page.screenshot()).toMatchSnapshot();
    const darkModeAccessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(darkModeAccessibilityScanResults.violations).toEqual([]);
  });
});
