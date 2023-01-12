import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-dropdown', () => {
  const nonFilterableDropdown = `<gux-dropdown lang="en" value="j">
      <gux-listbox aria-label="Favorite Animal">
        <gux-option value="a">Ant</gux-option>
        <gux-option value="b">Bat</gux-option>
        <gux-option value="c">Cat</gux-option>
        <gux-option value="d">Dog</gux-option>
        <gux-option value="e">Eel</gux-option>
        <gux-option value="f">Frog</gux-option>
        <gux-option value="g">Goat</gux-option>
        <gux-option value="h">Horse</gux-option>
        <gux-option value="i">Ibis</gux-option>
      </gux-listbox>
    </gux-dropdown>
  `;
  // remove in V4 (COMUI-1369)
  const filterableDropdown = `<gux-dropdown filterable filter-type="starts-with" lang="en" value="j">
  <gux-listbox aria-label="Favorite Animal">
  <gux-option value="a">Ant</gux-option>
  <gux-option value="b">Bear</gux-option>
  <gux-option value="be">Bee</gux-option>
  <gux-option value="c">Cat</gux-option>
  </gux-listbox>
</gux-dropdown>
`;
  const filterablePrefixDropdown = `<gux-dropdown filter-type="starts-with" lang="en" value="j">
  <gux-listbox aria-label="Favorite Animal">
  <gux-option value="a">Ant</gux-option>
  <gux-option value="b">Bear</gux-option>
  <gux-option value="be">Bee</gux-option>
  <gux-option value="c">Cat</gux-option>
  </gux-listbox>
</gux-dropdown>
`;
  const filterableCustomDropdown = `<gux-dropdown filter-type="custom" lang="en" value="j">
<gux-listbox aria-label="Favorite Animal">
  <gux-option value="a">Ant</gux-option>
  <gux-option value="b">Bear</gux-option>
  <gux-option value="be">Bee</gux-option>
  <gux-option value="c">Cat</gux-option>
</gux-listbox>
</gux-dropdown>
`;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      const element = await page.find('gux-dropdown');
      expect(element).toHaveAttribute('hydrated');
    });
  });

  describe('filterable', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html: filterablePrefixDropdown });
      const element = await page.find('gux-dropdown');
      expect(element).toHaveAttribute('hydrated');
    });
    it('opens dropdown on click', async () => {
      const page = await newSparkE2EPage({ html: filterablePrefixDropdown });
      await page.waitForChanges();
      await a11yCheck(page, [], 'before opening dropdown with filter');
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();
      await a11yCheck(page, [], 'after opening dropdown with filter');

      const dropMenu = await page.find('pierce/.gux-popup-container');

      expect(dropMenu.className.split(' ')).toContain('gux-expanded');
    });
    it('filters items in the dropdown', async () => {
      const page = await newSparkE2EPage({ html: filterablePrefixDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(4);
      await page.keyboard.press('b');
      await page.waitForChanges();
      listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(2);
      expect(listboxItems[0].textContent).toEqual('Bear');
    });
    it('does not filter items when filter type is custom', async () => {
      const page = await newSparkE2EPage({ html: filterableCustomDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(4);
      await page.keyboard.press('b');
      await page.waitForChanges();
      listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(4);
      expect(listboxItems[0].textContent).toEqual('Ant');
    });
    // remove in V4 (COMUI-1369)
    it('is backwards compatible with filterable property', async () => {
      const page = await newSparkE2EPage({ html: filterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();

      let listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );

      expect(listboxItems.length).toBe(4);
      await page.keyboard.press('b');
      await page.waitForChanges();
      listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
      );
      expect(listboxItems.length).toBe(2);
      expect(listboxItems[0].textContent).toEqual('Bear');
    });
  });

  describe('click', () => {
    it('opens drop down on click', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      await page.waitForChanges();
      await a11yCheck(page, [], 'before opening dropdown');
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.click();
      await page.waitForChanges();
      await a11yCheck(page, [], 'after opening dropdown');

      const dropMenu = await page.find('pierce/.gux-popup-container');

      expect(dropMenu.className.split(' ')).toContain('gux-expanded');
    });
  });

  describe('press', () => {
    it('opens and closes dropdown on keypress', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const dropdownMenu = await page.find('pierce/.gux-popup-container');

      expect(dropdownMenu.className.split(' ')).toContain('gux-expanded');

      await dropdownMenu.press('Escape');
      expect(dropdownMenu.className.split(' ')).not.toContain('gux-expanded');
    });

    it('focuses the listbox when down arrow is pressed', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find('gux-dropdown gux-listbox');
      const focusEl = await page.find(':focus');

      expect(listbox.outerHTML).toContain(focusEl.outerHTML);
    });

    it('moves between options when arrow keys are pressed', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find('gux-dropdown gux-listbox');
      const listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option'
      );

      let activeItem = await listbox.findAll('.gux-active');

      expect(activeItem.length).toBe(1);
      expect(activeItem[0].outerHTML).toContain(listboxItems[0].outerHTML);

      await activeItem[0].press('ArrowDown');
      activeItem = await listbox.findAll('.gux-active');

      expect(activeItem[0].outerHTML).toContain(listboxItems[1].outerHTML);
    });

    it('selects listbox options on keypress', async () => {
      const page = await newSparkE2EPage({ html: nonFilterableDropdown });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      let listboxItems = await page.findAll(
        'gux-dropdown gux-listbox gux-option'
      );
      let selectedItem = await page.findAll('.gux-selected');

      expect(selectedItem.length).toBe(0);

      await page.keyboard.press('Enter');

      selectedItem = await page.findAll('.gux-selected');
      listboxItems = await page.findAll('gux-dropdown gux-listbox gux-option');

      expect(selectedItem.length).toBe(1);
      expect(selectedItem[0].outerHTML).toContain(listboxItems[0].outerHTML);
    });
  });
});
