import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-selector-cards.common';

test.describe('gux-selector-cards-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-selector-cards-beta'
    });
  });

  test('switches between states when clicked', async ({ page }) => {
    await setContent(
      page,
      `
      <gux-selector-cards-beta>
        <gux-selector-card-beta variant="simple" id="one">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple" id="two">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple" id="three">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example1" disabled />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>
    `
    );

    const firstElement = page.locator('#one');
    const firstInput = firstElement.locator('input');

    const secondElement = page.locator('#two');
    const secondInput = secondElement.locator('input');

    const thirdElement = page.locator('#three');
    const thirdInput = thirdElement.locator('input');

    // Initial state - no inputs should be checked
    await expect(firstInput).not.toBeChecked();
    await expect(secondInput).not.toBeChecked();
    await expect(thirdInput).not.toBeChecked();

    // Click first element
    await firstElement.click();
    await page.waitForChanges();
    await expect(firstInput).toBeChecked();
    await expect(secondInput).not.toBeChecked();

    // Click second element
    await secondElement.click();
    await page.waitForChanges();
    await expect(firstInput).not.toBeChecked();
    await expect(secondInput).toBeChecked();

    // Click first element again
    await firstElement.click();
    await page.waitForChanges();
    await expect(firstInput).toBeChecked();
    await expect(secondInput).not.toBeChecked();

    // Try clicking disabled third element - should not change state
    await thirdElement.click();
    await page.waitForChanges();
    await expect(firstInput).toBeChecked();
    await expect(thirdInput).not.toBeChecked();
  });
});
