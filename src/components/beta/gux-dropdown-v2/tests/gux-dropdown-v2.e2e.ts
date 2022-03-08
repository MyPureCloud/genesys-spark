import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-dropdown-v2', () => {
  const html = `<gux-dropdown-v2-beta lang="en" value="j">
      <gux-listbox aria-label="Favorite Animal">
        <gux-option-v2 value="a">Ant</gux-option-v2>
        <gux-option-v2 value="b">Bat</gux-option-v2>
        <gux-option-v2 value="c">Cat</gux-option-v2>
        <gux-option-v2 value="d">Dog</gux-option-v2>
        <gux-option-v2 value="e">Eel</gux-option-v2>
        <gux-option-v2 value="f">Frog</gux-option-v2>
        <gux-option-v2 value="g">Goat</gux-option-v2>
        <gux-option-v2 value="h">Horse</gux-option-v2>
        <gux-option-v2 value="i">Ibis</gux-option-v2>
      </gux-listbox>
    </gux-dropdown-v2-beta>
  `;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-dropdown-v2-beta');
      expect(element).toHaveClass('hydrated');
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

      const listbox = await page.find('gux-dropdown-v2-beta gux-listbox');
      const focusEl = await page.find(':focus');

      expect(listbox.outerHTML).toContain(focusEl.outerHTML);
      console.log(focusEl.outerHTML);
    });

    it('moves between options when arrow keys are pressed', async () => {
      const page = await newSparkE2EPage({ html });
      await page.waitForChanges();
      const dropdownButtonElement = await page.find('pierce/.gux-field');
      await dropdownButtonElement.press('ArrowDown');

      const listbox = await page.find('gux-dropdown-v2-beta gux-listbox');
      const listboxItems = await page.findAll(
        'gux-dropdown-v2-beta gux-listbox gux-option-v2'
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
        'gux-dropdown-v2-beta gux-listbox gux-option-v2'
      );
      let selectedItem = await page.findAll('.gux-selected');

      expect(selectedItem.length).toBe(0);

      await page.keyboard.press('Enter');

      selectedItem = await page.findAll('.gux-selected');
      listboxItems = await page.findAll(
        'gux-dropdown-v2-beta gux-listbox gux-option-v2'
      );

      expect(selectedItem.length).toBe(1);
      expect(selectedItem[0].outerHTML).toContain(listboxItems[0].outerHTML);
    });
  });
});
