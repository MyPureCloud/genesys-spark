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

  const creatableDropdown = `
  <gux-dropdown-multi lang="en">
    <gux-listbox-multi aria-label="Animals">
      <gux-create-option slot="create"></gux-create-option>
      <gux-option-multi value="ant">Ant<span slot="subtext">Small</span></gux-option-multi>
      <gux-option-multi value="bear">Bear</gux-option-multi>
      <gux-option-multi value="cat">Cat</gux-option-multi>
    </gux-listbox-multi>
  </gux-dropdown-multi>
  `;

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

  test.describe('gux-select-all', () => {
    const selectAllHtml = `
      <gux-dropdown-multi lang="en">
        <gux-listbox-multi aria-label="Animals">
          <gux-select-all></gux-select-all>
          <gux-option-multi value="a">Ant</gux-option-multi>
          <gux-option-multi value="b">Bat</gux-option-multi>
          <gux-option-multi value="c">Cat</gux-option-multi>
        </gux-listbox-multi>
      </gux-dropdown-multi>
    `;

    test('selects all options when clicked', async ({ page }) => {
      await setContent(page, selectAllHtml);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      const selectAll = page.locator('gux-select-all');
      await selectAll.click();
      await page.waitForChanges();

      const listbox = component.locator('gux-listbox-multi');
      const selectedItems = listbox.locator('gux-option-multi.gux-selected');

      expect(await selectedItems.count()).toBe(3);
    });

    test('deselects all options when clicked again', async ({ page }) => {
      await setContent(page, selectAllHtml);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      const selectAll = page.locator('gux-select-all');
      await selectAll.click();
      await page.waitForChanges();
      await selectAll.click();
      await page.waitForChanges();

      const listbox = component.locator('gux-listbox-multi');
      const selectedItems = listbox.locator('gux-option-multi.gux-selected');
      expect(await selectedItems.count()).toBe(0);
    });

    test('updates counter text correctly', async ({ page }) => {
      await setContent(page, selectAllHtml);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      const selectAll = page.locator('gux-select-all');
      const counterText = selectAll.locator('.gux-counter-label');
      expect(await counterText.textContent()).toContain('(0 of 3)');

      await selectAll.click();
      await page.waitForChanges();
      expect(await counterText.textContent()).toContain('(3 of 3)');
    });
  });

  test.describe('filter', () => {
    test('filters dropdown contents (filter-type starts-with)', async ({
      page
    }) => {
      const filterableDropdown = `
      <gux-dropdown-multi filter-type="starts-with" lang="en">
        <gux-listbox-multi aria-label="Animals">
          <gux-option-multi value="ant">Ant</gux-option-multi>
          <gux-option-multi value="bear">Bear</gux-option-multi>
          <gux-option-multi value="bat">Bat</gux-option-multi>
          <gux-option-multi value="cat">Cat</gux-option-multi>
          <gux-option-multi value="dog">Dog</gux-option-multi>
        </gux-listbox-multi>
      </gux-dropdown-multi>
    `;
      await setContent(page, filterableDropdown);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      let listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );

      expect(await listboxItems.count()).toBe(5);
      await page.keyboard.press('b');
      await page.waitForChanges();

      listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );
      expect(await listboxItems.count()).toBe(2);
      await expect(listboxItems.first()).toHaveText('Bear');
    });

    test('does not filter dropdown contents (filter-type custom)', async ({
      page
    }) => {
      const filterableDropdown = `
        <gux-dropdown-multi filter-type="custom" lang="en">
          <gux-listbox-multi aria-label="Animals">
            <gux-option-multi value="ant">Ant</gux-option-multi>
            <gux-option-multi value="bear">Bear</gux-option-multi>
            <gux-option-multi value="bat">Bat</gux-option-multi>
            <gux-option-multi value="cat">Cat</gux-option-multi>
            <gux-option-multi value="dog">Dog</gux-option-multi>
          </gux-listbox-multi>
        </gux-dropdown-multi>
        `;

      await setContent(page, filterableDropdown);
      const component = page.locator('gux-dropdown-multi');

      // Expand listbox
      const dropdownButtonElement = component.locator('.gux-field');
      await dropdownButtonElement.click({ force: true });
      await page.waitForChanges();

      let listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );

      expect(await listboxItems.count()).toBe(5);
      await page.keyboard.press('b');
      await page.waitForChanges();

      listboxItems = component.locator(
        'gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );
      expect(await listboxItems.count()).toBe(5);
      await expect(listboxItems.first()).toHaveText('Ant');
    });

    test.describe('with the create option set', () => {
      test('provides the option to create items', async ({ page }) => {
        await setContent(page, creatableDropdown);
        const component = page.locator('gux-dropdown-multi');
        const text = 'bee';

        const dropdown = component.locator('gux-dropdown-multi');
        // const listbox = await dropdown.locator('gux-listbox-multi');
        // const listboxOptions = await listbox.locator('gux-option-multi');

        const dropdownButtonElement = component.locator('.gux-field');
        await dropdownButtonElement.click({ force: true });

        await page.waitForChanges();
        const input = dropdown.locator('.gux-filter-input');
        for (const char of text.split('')) {
          await input.press(char);
        }

        const createAction = dropdown.locator('gux-create-option');
        expect(createAction).not.toBeNull();
        await expect(createAction).not.toHaveClass('gux-filtered');

        // await inputFilter(page, dropdown, 'bee');

        // const createAction = await getCreateAction(dropdown);

        // await a11yCheck(page, axeExclusions);
        // expect(createAction).not.toBeNull();
        // expect(createAction).not.toHaveClass('gux-filtered');
      });

      // it('does not provide a create option if there is an exact match', async () => {
      //   const { page, dropdown } = await setupPage(creatableDropdown);
      //   await inputFilter(page, dropdown, 'cat');
      //   const createAction = await getCreateAction(dropdown);
      //   expect(createAction).toHaveClass('gux-filtered');
      // });

      // it('updates dropdown multi and listbox value when slot changes', async () => {
      //   const { page, dropdown, listbox } = await setupPage(creatableDropdown);
      //   let dropdownValue = await dropdown.getProperty('value');
      //   let listboxValue = await listbox.getProperty('value');
      //   let selectedItems = await page.findAll('.gux-selected');
      //   expect(selectedItems.length).toBe(0);
      //   expect(dropdownValue).toEqual(undefined);
      //   expect(listboxValue).toEqual(undefined);
      //   await addNewCustomOption(page);
      //   selectedItems = await page.findAll('.gux-selected');
      //   expect(selectedItems.length).toBe(1);
      //   dropdownValue = await dropdown.getProperty('value');
      //   listboxValue = await listbox.getProperty('value');
      //   expect(dropdownValue).toEqual('newoption');
      //   expect(listboxValue).toEqual('newoption');
      // });
    });
  });
});
