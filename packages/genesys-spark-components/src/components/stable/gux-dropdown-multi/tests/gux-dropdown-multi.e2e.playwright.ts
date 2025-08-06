import {
  checkRenders,
  test,
  expect,
  setContent,
  AxeExclusion
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-dropdown-multi.common';

const axeExclusions: AxeExclusion[] = [
  {
    issueId: 'target-size',
    target: 'gux-dropdown-multi,button',
    exclusionReason:
      'COMUI-2948 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  },
  {
    issueId: 'target-size',
    target: 'gux-dropdown-multi,gux-dropdown-multi-tag,.gux-tag-remove-button',
    exclusionReason:
      'COMUI-2948 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  },
  {
    issueId: 'nested-interactive',
    target: 'gux-dropdown-multi,.gux-field',
    exclusionReason:
      'COMUI-2948 Element has focusable descendants. Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies.'
  }
];

test.describe('gux-dropdown-multi', () => {
  test.describe('#render', () => {
    // No element specified here in order to see the menu in the screenshot
    checkRenders({
      renderConfigs: [renderConfig],
      axeExclusions
    });
  });

  test.describe('click', () => {
    test('opens drop down on click', async ({ page }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      const dropMenu = component.locator('.gux-popup-container');

      // Check listbox is expanded
      await expect(dropMenu).toHaveClass(/gux-expanded/);
    });

    test('selects and unselects items on click', async ({ page }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();
      const listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi'
      );

      // Initially no items should be selected, and listbox item length should be 9
      let selectedItems = component.locator('.gux-selected');
      const listboxItemCount = await listboxItems.count();
      expect(selectedItems.all).toHaveLength(0);
      expect(listboxItemCount).toBe(9);

      // Click first item in listbox
      await listboxItems.first().click();
      await page.waitForChanges();

      // There should be one selected item now
      selectedItems = component.locator(
        'gux-listbox-multi gux-option-multi.gux-selected'
      );
      let selectedItemCount = await selectedItems.count();
      expect(selectedItemCount).toBe(1);

      // TODO: do we need this a11y check here?
      // await a11yCheck(
      //   page,
      //   [
      //   {
      //       issueId: 'color-contrast',
      //       exclusionReason:
      //       'COMUI-3533: Subtext on hover fails color contrast requirments'
      //   },
      //   ...axeExclusions
      //   ],
      //   'after selecting an item'
      // );

      // Click on 2nd item in listbox
      await listboxItems.nth(1).click();
      await page.waitForChanges();

      // Check there are 2 items selected in listbox
      selectedItems = component.locator(
        'gux-listbox-multi gux-option-multi.gux-selected'
      );
      selectedItemCount = await selectedItems.count();
      expect(selectedItemCount).toBe(2);

      // Deselect first item in listbox
      await listboxItems.first().click();
      await page.waitForChanges();

      // Check only 1 item is selected in listbox
      selectedItemCount = await selectedItems.count();
      expect(selectedItemCount).toBe(1);
    });

    test('clears all selections', async ({ page }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();
      const listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi'
      );

      // Click on first 3 listbox items
      await listboxItems.first().click();
      await listboxItems.nth(1).click();
      await listboxItems.nth(2).click();
      await page.waitForChanges();

      // Check 3 items are selected in listbox
      let selectedItems = component.locator('.gux-selected');
      const selectedItemCount = await selectedItems.count();
      expect(selectedItemCount).toBe(3);

      // Click remove button and check all selections are removed
      let removeButton = component.locator('.gux-tag-remove-button');
      expect(await removeButton.count()).toBe(1);
      await removeButton.first().click();
      await page.waitForChanges();
      selectedItems = component.locator('.gux-selected');
      expect(await selectedItems.count()).toBe(0);

      // Check remove button is gone now
      removeButton = component.locator('.gux-tag-remove-button');
      expect(await removeButton.count()).toBe(0);
    });

    test('does not close dropdown when an option is selected', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();
      const listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi'
      );

      // Click on first listbox item
      await listboxItems.first().click();

      // Check listbox is expanded
      const dropMenu = component.locator('.gux-popup-container');
      await expect(dropMenu).toHaveClass(/gux-expanded/);
    });
  });

  test.describe('press', () => {
    test('opens and closes dropdown on keypress', async ({ page }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Press down arrow
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      // Check listbox is expanded
      const dropMenu = component.locator('.gux-popup-container');
      await expect(dropMenu).toHaveClass(/gux-expanded/);

      // Press escape
      await dropMenu.press('Escape');

      // Check listbox is expanded
      await expect(dropMenu).not.toHaveClass(/gux-expanded/);
    });

    test('focuses the listbox when down arrow is pressed', async ({ page }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      // Press down arrow
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      await page.waitForChanges();

      const listbox = component.locator('gux-listbox-multi');
      const focusEl = component.locator(':focus');

      const listboxHtml = await listbox.innerHTML();
      const focusElementHtml = await focusEl.innerHTML();

      expect(listboxHtml).toContain(focusElementHtml);
    });

    test('moves between options when arrow keys are pressed', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      await page.waitForChanges();

      const listbox = component.locator('gux-listbox-multi');
      const listboxItems = listbox.locator('gux-option-multi');

      let activeItem = listbox.locator('.gux-active');

      const activeItemCount = await activeItem.count();
      expect(activeItemCount).toBe(1);
      expect(await activeItem.first().innerHTML()).toContain(
        await listboxItems.first().innerHTML()
      );

      await activeItem.first().press('ArrowDown');

      await page.waitForChanges();

      activeItem = listbox.locator('.gux-active');

      expect(await activeItem.first().innerHTML()).toContain(
        await listboxItems.nth(1).innerHTML()
      );
    });

    test('selects and unselects listbox options on keypress', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);
      const component = page.locator('gux-dropdown-multi');

      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      await page.waitForChanges();

      const listbox = component.locator('gux-listbox-multi');
      let listboxItems = listbox.locator('gux-option-multi');

      let selectedItems = component.locator('.gux-selected');
      expect(await selectedItems.count()).toBe(0);

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = component.locator('.gux-selected');
      listboxItems = listbox.locator('gux-option-multi');

      expect(await selectedItems.count()).toBe(1);
      expect(await selectedItems.first().innerHTML()).toContain(
        await listboxItems.first().innerHTML()
      );

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = page.locator('.gux-selected');
      expect(await selectedItems.count()).toBe(2);

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = page.locator('.gux-selected');
      expect(await selectedItems.count()).toBe(1);
    });
  });
});
