import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

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
      await a11yCheck(page, axeExclusions, 'before opening dropdown');
      const dropdownButtonElm = await page.find(
        'gux-dropdown-v2-beta >>> .gux-field-button'
      );
      dropdownButtonElm.click();
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions, 'after opening dropdown');

      const dropMenu = await page.find(
        'gux-dropdown-v2-beta >>> .gux-popup-container'
      );
      expect(dropMenu.className.split(' ')).toContain('gux-expanded');
    });
  });
});
