import {
  test,
  E2EPage,
  checkRenders,
  setContent,
  expect
} from '../../../../test/playwrightTestUtils';
import { renderConfigs } from './gux-avatar-group.common';

async function setupNonrandomPage(page: E2EPage, html: string): Promise<void> {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  await setContent(page, html);
}

test.describe('gux-avatar-group', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs
    });
  });

  test.describe('#interaction', () => {
    test('should handles tabindex on navigation as expected without overflow', async ({
      page
    }) => {
      const html = `<gux-avatar-group-beta>
        <gux-avatar-group-item-beta name="Conor Darcy">
          </gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Elliot Fitzgerald"
        ></gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Greg Hayes"
        ></gux-avatar-group-item-beta>
        </gux-avatar-group-beta>`;

      await setupNonrandomPage(page, html);

      const element = page.locator('gux-avatar-group-beta');
      const firstAvatarGroupItem = page.locator(
        'gux-avatar-group-item-beta[name="Conor Darcy"]'
      );
      const firstItemButton = firstAvatarGroupItem.locator('button');
      const secondAvatarGroupItem = page.locator(
        'gux-avatar-group-item-beta[name="Elliot Fitzgerald"]'
      );
      const secondItemButton = secondAvatarGroupItem.locator('button');
      const lastAvatarGroupItem = page.locator(
        'gux-avatar-group-item-beta[name="Greg Hayes"]'
      );
      const lastItemButton = lastAvatarGroupItem.locator('button');

      await element.press('Tab');
      await page.waitForChanges();

      // correct initially
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '-1');

      // navigate to next group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '0');
      await expect(lastItemButton).toHaveAttribute('tabindex', '-1');

      // navigate to last group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '0');

      // navigate to first group item going right
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '-1');

      // navigate to last group item going left
      await element.press('ArrowLeft');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '0');

      await element.press('Home');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '-1');

      await element.press('End');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '0');

      // navigate out of group, keeps correct tab index
      await element.press('Tab');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(lastItemButton).toHaveAttribute('tabindex', '0');

      // click on second item
      await secondAvatarGroupItem.click();
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '0');
      await expect(lastItemButton).toHaveAttribute('tabindex', '-1');
    });

    test('should handles tabindex on navigation as expected with overflow', async ({
      page
    }) => {
      const html = `<gux-avatar-group-beta quantity="2">
        <gux-avatar-group-item-beta name="Conor Darcy">
          </gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Elliot Fitzgerald"
        ></gux-avatar-group-item-beta>
        <gux-avatar-group-item-beta
          name="Greg Hayes"
        ></gux-avatar-group-item-beta>
        </gux-avatar-group-beta>`;

      await setupNonrandomPage(page, html);

      const element = page.locator('gux-avatar-group-beta');
      const firstAvatarGroupItem = page.locator(
        'gux-avatar-group-item-beta[name="Conor Darcy"]'
      );
      const firstItemButton = firstAvatarGroupItem.locator('button');
      const secondAvatarGroupItem = page.locator(
        'gux-avatar-group-item-beta[name="Elliot Fitzgerald"]'
      );
      const secondItemButton = secondAvatarGroupItem.locator('button');

      await element.press('Tab');
      await page.waitForChanges();

      const overflow = page.locator('gux-avatar-overflow-beta');
      const overflowButton = overflow.locator('button').first();

      // correct initially
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '-1');

      // navigate to next group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '0');
      await expect(overflowButton).toHaveAttribute('tabindex', '-1');

      // navigate to last group item
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '0');

      // navigate to first group item going right
      await element.press('ArrowRight');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '-1');

      // navigate to last group item going left
      await element.press('ArrowLeft');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '0');

      await element.press('Home');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '0');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '-1');

      await element.press('End');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '0');

      // navigate out of group, keeps correct tab index
      await element.press('Tab');
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '0');

      // click on overflow item
      await overflow.click();
      await page.waitForChanges();
      await expect(firstItemButton).toHaveAttribute('tabindex', '-1');
      await expect(secondItemButton).toHaveAttribute('tabindex', '-1');
      await expect(overflowButton).toHaveAttribute('tabindex', '0');
    });
  });
});
