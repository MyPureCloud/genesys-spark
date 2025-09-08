import {
  checkRenders,
  setContent,
  test,
  expect,
  E2EPage
} from '@test/playwrightTestUtils';

import {
  closedRenderConfigs,
  openRenderConfigs,
  testData
} from './gux-dropdown.common';

const axeExclusions = [
  {
    issueId: 'target-size',
    target: 'gux-dropdown,button',
    exclusionReason:
      'COMUI-2947 Target has insufficient size (20px by 18px, should be at least 24px by 24px) Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  }
];

test.describe('gux-dropdown', () => {
  test.describe('#render closed', () => {
    checkRenders({
      renderConfigs: closedRenderConfigs,
      axeExclusions
    });
  });

  test.describe('#render open', () => {
    checkRenders({
      renderConfigs: openRenderConfigs,
      axeExclusions,
      extraActions: async (page: E2EPage) => {
        const button = page
          .locator('gux-dropdown')
          .locator('button.gux-field-button');
        const listbox = page.locator('gux-dropdown').locator('gux-listbox');
        await button.waitFor({ state: 'visible' });
        if ((await button.getAttribute('aria-expanded')) !== 'true') {
          await button.click();
        }
        await listbox.waitFor({ state: 'visible' });
      }
    });
  });

  test.describe('filterable', () => {
    test('opens dropdown on click with filter', async ({ page }) => {
      const html = createFilterableDropdown(
        'starts-with',
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      const filterInput = page.locator('.gux-filter-input');
      await filterInput.focus();
      await page.waitForChanges();

      const button = page.locator('.gux-field-button');
      await expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('filters items in the dropdown with starts-with filter', async ({
      page
    }) => {
      const html = createFilterableDropdown(
        'starts-with',
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      const filterInput = page.locator('.gux-filter-input');
      await filterInput.focus();
      await page.waitForChanges();

      let visibleItems = await getUnfilteredOptions(page, 'gux-option');
      await expect(visibleItems).toHaveCount(5);

      await page.keyboard.press('b');
      await page.waitForChanges();

      visibleItems = await getUnfilteredOptions(page, 'gux-option');
      await expect(visibleItems).toHaveCount(2);
      await expect(visibleItems.first()).toContainText('Bear');
    });

    test('does not filter items when filter type is custom', async ({
      page
    }) => {
      const html = createFilterableDropdown(
        'custom',
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      const filterInput = page.locator('.gux-filter-input');
      await filterInput.focus();
      await page.waitForChanges();

      let visibleItems = await getUnfilteredOptions(page, 'gux-option');
      await expect(visibleItems).toHaveCount(5);

      await page.keyboard.press('b');
      await page.waitForChanges();

      visibleItems = await getUnfilteredOptions(page, 'gux-option');
      await expect(visibleItems).toHaveCount(5);
      await expect(visibleItems.first()).toContainText('Ant');
    });
  });

  test.describe('click interactions', () => {
    test('opens dropdown on click', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithClick(page);
      await expectDropdownToBeOpen(page);
    });
  });

  test.describe('keyboard navigation', () => {
    test('opens and closes dropdown on keypress', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);
      await expectDropdownToBeOpen(page);

      const button = page.locator('.gux-field-button');
      await button.press('Escape');

      await expectDropdownToBeClosed(page);
    });

    test('focuses the listbox when down arrow is pressed', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      await page.waitForChanges();

      const activeItem = page.locator('.gux-active');
      await expect(activeItem).toHaveCount(1);
    });

    test('moves between options when arrow keys are pressed', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      const listbox = page.locator('gux-dropdown gux-listbox');
      const listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);

      let activeItem = listbox.locator('.gux-active');
      await expect(activeItem).toHaveCount(1);

      const firstActiveText = await activeItem.first().textContent();
      const firstItemText = await listboxItems.first().textContent();
      expect(firstActiveText).toContain(firstItemText?.trim() || '');

      await activeItem.first().press('ArrowDown');
      await page.waitForChanges();

      activeItem = listbox.locator('.gux-active');

      const secondActiveText = await activeItem.first().textContent();
      const secondItemText = await listboxItems.nth(1).textContent();
      expect(secondActiveText).toContain(secondItemText?.trim() || '');
    });

    test('moves focus between first and last option when using respective arrow keys', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      const listbox = page.locator('gux-dropdown gux-listbox');
      const listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);

      let activeItem = listbox.locator('.gux-active');
      await expect(activeItem).toHaveCount(1);

      const firstActiveText = await activeItem.first().textContent();
      const firstItemText = await listboxItems.first().textContent();
      expect(firstActiveText).toContain(firstItemText?.trim() || '');

      await activeItem.first().press('ArrowUp');
      await page.waitForChanges();

      activeItem = listbox.locator('.gux-active');

      const lastActiveText = await activeItem.first().textContent();
      const lastItemText = await listboxItems.nth(4).textContent();
      expect(lastActiveText).toContain(lastItemText?.trim() || '');

      await activeItem.first().press('ArrowDown');
      await page.waitForChanges();

      activeItem = listbox.locator('.gux-active');

      const backToFirstText = await activeItem.first().textContent();
      expect(backToFirstText).toContain(firstItemText?.trim() || '');
    });

    test('moves between groups when arrow keys are pressed', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.groupedListboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      const listbox = page.locator('gux-dropdown gux-listbox');
      const listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);

      let activeItem = listbox.locator('.gux-active');
      await expect(activeItem).toHaveCount(1);

      const firstActiveText = await activeItem.first().textContent();
      const firstItemText = await listboxItems.first().textContent();
      expect(firstActiveText).toContain(firstItemText?.trim() || '');

      await activeItem.first().press('ArrowDown');
      await page.waitForChanges();
      await activeItem.first().press('ArrowDown');
      await page.waitForChanges();

      activeItem = listbox.locator('.gux-active');

      const thirdActiveText = await activeItem.first().textContent();
      const thirdItemText = await listboxItems.nth(2).textContent();
      expect(thirdActiveText).toContain(thirdItemText?.trim() || '');
    });

    test('selects listbox options on keypress', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      let listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);
      let selectedItem = page.locator('.gux-selected');
      await expect(selectedItem).toHaveCount(0);

      const listbox = page.locator('gux-dropdown gux-listbox');
      await listbox.focus();
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await expectDropdownToBeClosed(page);

      await page.waitForChanges();

      await openWithKeyboard(page);

      selectedItem = page.locator('.gux-selected');
      listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);

      await expect(selectedItem).toHaveCount(1);

      const selectedText = await selectedItem.first().textContent();
      const firstItemText = await listboxItems.first().textContent();
      expect(selectedText).toContain(firstItemText?.trim() || '');
    });

    test('selects a listbox item with a value of an empty string', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      // Use the correct selector for the dropdown text content
      const dropdownSelectedText = page.locator(`.gux-field`);
      await expect(dropdownSelectedText).toContainText('Select...');

      await openWithKeyboard(page);

      const lastOption = page
        .locator('gux-dropdown gux-listbox gux-option')
        .nth(4);
      await lastOption.click();
      await expectDropdownToBeClosed(page);

      await page.waitForChanges();

      await openWithKeyboard(page);

      const selectedItem = page.locator('.gux-selected');
      const listboxItems = page.locator(`gux-dropdown gux-listbox gux-option`);

      await expect(dropdownSelectedText).toContainText('None');
      await expect(selectedItem).toHaveCount(1);

      const selectedText = await selectedItem.first().textContent();
      const lastItemText = await listboxItems.nth(4).textContent();
      expect(selectedText).toContain(lastItemText?.trim() || '');
    });
  });

  test.describe('selected option text for options with subtext', () => {
    test('dropdown selected text is correct for option with subtext slotted after option text', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      const dropdownSelectedText = page.locator(`.gux-field`);
      await expect(dropdownSelectedText).toContainText('Select...');

      await openWithKeyboard(page);

      const secondOption = page
        .locator('gux-dropdown gux-listbox gux-option')
        .nth(1);
      await secondOption.click();
      await expectDropdownToBeClosed(page);

      await page.waitForChanges();

      await openWithKeyboard(page);

      await expect(dropdownSelectedText).toHaveText('Bear Large');
    });

    test('dropdown selected text is correct for option with subtext slotted before option text', async ({
      page
    }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option']
      );
      await setContent(page, html);

      const dropdownSelectedText = page.locator(`.gux-field`);
      await expect(dropdownSelectedText).toContainText('Select...');

      await openWithKeyboard(page);

      const thirdOption = page
        .locator('gux-dropdown gux-listbox gux-option')
        .nth(2);
      await thirdOption.click();
      await expectDropdownToBeClosed(page);

      await page.waitForChanges();

      await openWithKeyboard(page);

      await expect(dropdownSelectedText).toHaveText('Bee Small');
    });
  });

  test.describe('icon options', () => {
    test('renders icon options correctly', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option-icon']
      );
      await setContent(page, html);

      const dropdown = page.locator('gux-dropdown');
      await expect(dropdown).toHaveAttribute('hydrated');
    });

    test('handles icon options with subtext correctly', async ({ page }) => {
      const html = createNonFilterableDropdown(
        testData.listboxContent['gux-option-icon']
      );
      await setContent(page, html);

      await openWithKeyboard(page);

      const secondOption = page
        .locator('gux-dropdown gux-listbox gux-option-icon')
        .nth(1);
      await secondOption.click();
      await expectDropdownToBeClosed(page);

      await openWithKeyboard(page);

      const dropdownSelectedText = page.locator(`.gux-field`);
      await expect(dropdownSelectedText).toHaveText('Bear Large');
    });
  });
});

// Helper functions
async function openWithClick(page: E2EPage) {
  const dropdownButtonElement = page.locator('.gux-field-button');
  await dropdownButtonElement.click();
  await page.waitForChanges();
}

async function openWithKeyboard(page: E2EPage) {
  const dropdownButtonElement = page.locator('.gux-field-button');
  await dropdownButtonElement.press('ArrowDown');
}

async function getUnfilteredOptions(page: E2EPage, optionType: string) {
  return page.locator(
    `gux-dropdown gux-listbox ${optionType}:not(.gux-filtered)`
  );
}

async function expectDropdownToBeOpen(page: E2EPage) {
  const button = page.locator('.gux-field-button');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
}

async function expectDropdownToBeClosed(page: E2EPage) {
  const button = page.locator('.gux-field-button');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
}

function createNonFilterableDropdown(listboxContent: string) {
  return `
    <gux-dropdown lang="en" value="j">
      <gux-listbox aria-label="Favorite Animal">
        ${listboxContent}
      </gux-listbox>
    </gux-dropdown>
  `;
}

function createFilterableDropdown(filterType: string, listboxContent: string) {
  return `
    <gux-dropdown filter-type="${filterType}" lang="en" value="j">
      <gux-listbox aria-label="Favorite Animal">
        ${listboxContent}
      </gux-listbox>
    </gux-dropdown>
  `;
}
