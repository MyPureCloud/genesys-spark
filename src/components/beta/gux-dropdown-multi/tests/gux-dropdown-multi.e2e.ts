import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-dropdown-multi-beta', () => {
  const html = `
    <gux-dropdown-multi-beta lang="en">
      <gux-listbox-multi aria-label="Animals">
        <gux-option-multi value="a">Ant</gux-option-multi>
        <gux-option-multi value="b">Bat</gux-option-multi>
        <gux-option-multi value="c">Cat</gux-option-multi>
        <gux-option-multi value="d">Dog</gux-option-multi>
        <gux-option-multi value="e">Eel</gux-option-multi>
        <gux-option-multi value="f">Frog</gux-option-multi>
        <gux-option-multi value="g">Goat</gux-option-multi>
        <gux-option-multi value="h">Horse</gux-option-multi>
        <gux-option-multi value="i">Ibis</gux-option-multi>
      </gux-listbox-multi>
    </gux-dropdown-multi-beta>
  `;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-dropdown-multi-beta');
      expect(element).toHaveAttribute('hydrated');
    });
  });

  describe('click', () => {
    it('opens drop down on click', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      await a11yCheck(page, [], 'before opening dropdown');
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();
      await a11yCheck(page, [], 'after opening dropdown');

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
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi'
      );
      await listboxItems[0].click();
      await page.waitForChanges();
      selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(1);

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
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi'
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

      const listbox = await page.find(
        'gux-dropdown-multi-beta gux-listbox-multi'
      );
      const focusEl = await page.find(':focus');
      expect(listbox.outerHTML).toContain(focusEl.outerHTML);
    });

    it('moves between options when arrow keys are pressed', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find(
        'gux-dropdown-multi-beta gux-listbox-multi'
      );
      const listboxItems = await page.findAll(
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi'
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
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi'
      );
      let selectedItems = await page.findAll('.gux-selected');
      expect(selectedItems.length).toBe(0);

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      selectedItems = await page.findAll('.gux-selected');
      listboxItems = await page.findAll(
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi'
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
    it('filters dropdown contents', async () => {
      const filterableDropdown = `
      <gux-dropdown-multi-beta filterable lang="en">
        <gux-listbox-multi aria-label="Animals">
          <gux-option-multi value="ant">Ant</gux-option-multi>
          <gux-option-multi value="bear">Bear</gux-option-multi>
          <gux-option-multi value="bat">Bat</gux-option-multi>
          <gux-option-multi value="cat">Cat</gux-option-multi>
          <gux-option-multi value="dog">Dog</gux-option-multi>
        </gux-listbox-multi>
      </gux-dropdown-multi-beta>
    `;
      const page = await newSparkE2EPage({ html: filterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(5);
      await page.keyboard.press('b');
      await page.waitForChanges();

      listboxItems = await page.findAll(
        'gux-dropdown-multi-beta gux-listbox-multi gux-option-multi:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(2);
      expect(listboxItems[0].textContent).toEqual('Bear');
    });
  });
});
