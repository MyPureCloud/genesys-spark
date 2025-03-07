import { E2EElement, E2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';

const axeExclusions = [
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

describe('gux-dropdown-multi', () => {
  const html = `
    <gux-dropdown-multi lang="en">
      <gux-listbox-multi aria-label="Animals">
        <gux-option-multi value="a">Ant<span slot="subtext">Small</span></gux-option-multi>
        <gux-option-multi value="b">Bat</gux-option-multi>
        <gux-option-multi value="c">Cat</gux-option-multi>
        <gux-option-multi value="d">Dog</gux-option-multi>
        <gux-option-multi value="e">Eel</gux-option-multi>
        <gux-option-multi value="f">Frog</gux-option-multi>
        <gux-option-multi value="g">Goat</gux-option-multi>
        <gux-option-multi value="h">Horse<span slot="subtext">Large</span></gux-option-multi>
        <gux-option-multi value="i">Ibis</gux-option-multi>
      </gux-listbox-multi>
    </gux-dropdown-multi>
  `;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-dropdown-multi');
      expect(element).toHaveAttribute('hydrated');
    });
  });

  describe('click', () => {
    it('opens drop down on click', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions, 'before opening dropdown');
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions, 'after opening dropdown');

      const dropMenu = await page.find('pierce/.gux-popup-container');

      expect(dropMenu.className.split(' ')).toContain('gux-expanded');
    });

    it('selects and unselects items on click', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();
      let selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(0);

      const listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi'
      );
      await listboxItems[0].click();
      await page.waitForChanges();
      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(1);
      await a11yCheck(
        page,
        [
          {
            issueId: 'color-contrast',
            exclusionReason:
              'COMUI-3533: Subtext on hover fails color contrast requirments'
          },
          ...axeExclusions
        ],
        'after selecting an item'
      );

      await listboxItems[1].click();
      await page.waitForChanges();
      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(2);

      await listboxItems[0].click();
      await page.waitForChanges();
      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(1);
    });

    it('clears all selections', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      const listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi'
      );
      await listboxItems[0].click();
      await listboxItems[1].click();
      await listboxItems[2].click();
      await page.waitForChanges();
      let selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(3);

      let removeButton = await page.findAll('pierce/.gux-tag-remove-button');
      expect(removeButton.length).toBe(1);
      await removeButton[0].click();
      await page.waitForChanges();
      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(0);

      removeButton = await page.findAll('pierce/.gux-tag-remove-button');
      expect(removeButton.length).toBe(0);
    });

    it('does not close dropdown when an option is selected', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      const dropMenu = await page.find('pierce/.gux-popup-container');

      expect(dropMenu.className.split(' ')).toContain('gux-expanded');
    });
  });

  describe('press', () => {
    it('opens and closes dropdown on keypress', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const dropdownMenu = await page.find('pierce/.gux-popup-container');
      expect(dropdownMenu.className.split(' ')).toContain('gux-expanded');

      await dropdownMenu.press('Escape');
      expect(dropdownMenu.className.split(' ')).not.toContain('gux-expanded');
    });

    it('focuses the listbox when down arrow is pressed', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find('gux-dropdown-multi gux-listbox-multi');
      const focusEl = await page.find(':focus');
      expect(listbox.outerHTML).toContain(focusEl.outerHTML);
    });

    it('moves between options when arrow keys are pressed', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find('gux-dropdown-multi gux-listbox-multi');
      const listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi'
      );

      let activeItem = await listbox.findAll('.gux-active');

      expect(activeItem.length).toBe(1);
      expect(activeItem[0].outerHTML).toContain(listboxItems[0].outerHTML);

      await activeItem[0].press('ArrowDown');
      activeItem = await listbox.findAll('.gux-active');

      expect(activeItem[0].outerHTML).toContain(listboxItems[1].outerHTML);
    });

    it('selects and unselects listbox options on keypress', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      let listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi'
      );
      let selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(0);

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = await page.findAll('.gux-selected');
      listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi'
      );

      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0].outerHTML).toContain(listboxItems[0].outerHTML);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(2);

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(1);
    });
  });
  describe('filter', () => {
    it('filters dropdown contents (filter-type starts-with)', async () => {
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
      const page = await newSparkE2EPage({ html: filterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(5);
      await page.keyboard.press('b');
      await page.waitForChanges();

      listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(2);
      expect(listboxItems[0].textContent).toEqual('Bear');
    });
    it('does not filter dropdown contents (filter-type custom)', async () => {
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
      const page = await newSparkE2EPage({ html: filterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(5);
      await page.keyboard.press('b');
      await page.waitForChanges();

      listboxItems = await page.findAll(
        'gux-dropdown-multi gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(5);
      expect(listboxItems[0].textContent).toEqual('Ant');
    });

    describe('with the create option set', () => {
      it('provides the option to create items', async () => {
        const { page, dropdown } = await setupPage(creatableDropdown);
        await inputFilter(page, dropdown, 'bee');
        const createAction = await getCreateAction(dropdown);
        await a11yCheck(page, axeExclusions);
        expect(createAction).not.toBeNull();
        expect(createAction).not.toHaveClass('gux-filtered');
      });

      it('does not provide a create option if there is an exact match', async () => {
        const { page, dropdown } = await setupPage(creatableDropdown);
        await inputFilter(page, dropdown, 'cat');
        const createAction = await getCreateAction(dropdown);
        expect(createAction).toHaveClass('gux-filtered');
      });

      it('updates dropdown multi and listbox value when slot changes', async () => {
        const { page, dropdown, listbox } = await setupPage(creatableDropdown);
        let dropdownValue = await dropdown.getProperty('value');
        let listboxValue = await listbox.getProperty('value');
        let selectedItems = await page.findAll('.gux-selected');
        expect(selectedItems.length).toBe(0);
        expect(dropdownValue).toEqual(undefined);
        expect(listboxValue).toEqual(undefined);
        await addNewCustomOption(page);
        selectedItems = await page.findAll('.gux-selected');
        expect(selectedItems.length).toBe(1);
        dropdownValue = await dropdown.getProperty('value');
        listboxValue = await listbox.getProperty('value');
        expect(dropdownValue).toEqual('newoption');
        expect(listboxValue).toEqual('newoption');
      });
    });
  });
});

// HELPER FUNCTIONS

async function setupPage(html: string): Promise<{
  page: E2EPage;
  dropdown: E2EElement;
  listbox: E2EElement;
  listboxOptions: Array<E2EElement>;
}> {
  const page = await newSparkE2EPage({ html });
  await page.waitForChanges();
  const dropdown = await page.find('gux-dropdown-multi');
  const listbox = await page.find('gux-listbox-multi');
  const listboxOptions = await page.findAll('gux-option-multi');
  return { page, dropdown, listbox, listboxOptions };
}

async function inputFilter(
  page: E2EPage,
  dropdown: E2EElement,
  text: string
): Promise<void> {
  const dropdownButton = await dropdown.find('pierce/.gux-field');
  await dropdownButton.click();
  await page.waitForChanges();
  const input = await dropdown.find('pierce/.gux-filter-input');
  for (const char of text.split('')) {
    await input.press(char);
  }
}

async function getCreateAction(dropdown: E2EElement): Promise<E2EElement> {
  return await dropdown.find('gux-create-option');
}

async function addNewCustomOption(page: E2EPage): Promise<void> {
  await page.evaluate(() => {
    const listboxElement = document.querySelector('gux-listbox-multi');
    const element = document.createElement('gux-option-multi');
    element.setAttribute('custom', 'true');
    element.setAttribute('value', 'newoption');
    element.innerText = 'newoption';
    listboxElement.appendChild(element);
  });
  await page.waitForChanges();
}

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
