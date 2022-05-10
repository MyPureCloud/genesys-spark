import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-dropdown', () => {
  const html = `<gux-dropdown lang="en" value="j">
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
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-dropdown');
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

      const listbox = await page.find('gux-dropdown gux-listbox');
      const focusEl = await page.find(':focus');

      expect(listbox.outerHTML).toContain(focusEl.outerHTML);
    });

    it('moves between options when arrow keys are pressed', async () => {
      const page = await newSparkE2EPage({ html });
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
      const page = await newSparkE2EPage({ html });
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
