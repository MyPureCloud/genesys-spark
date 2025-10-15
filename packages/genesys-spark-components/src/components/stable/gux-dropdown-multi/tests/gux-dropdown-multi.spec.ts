import { newSpecPage } from '@test/specTestUtils';

import { GuxDropdownMulti } from '../gux-dropdown-multi';
import { GuxListboxMulti } from '../../gux-listbox-multi/gux-listbox-multi';
import { GuxOptionMulti } from '../../gux-listbox-multi/gux-option-multi/gux-option-multi';
import { GuxSelectAll } from '../../gux-listbox-multi/gux-select-all/gux-select-all';
import { GuxDropdownMultiTag } from '../gux-dropdown-multi-tag/gux-dropdown-multi-tag';

const components = [
  GuxDropdownMulti,
  GuxListboxMulti,
  GuxOptionMulti,
  GuxSelectAll,
  GuxDropdownMultiTag
];
const html = `
<gux-dropdown-multi>
  <gux-listbox-multi aria-label="Animals">
    <gux-option-multi value="a" disabled>Ant</gux-option-multi>
    <gux-option-multi value="b">Bat</gux-option-multi>
    <gux-option-multi value="c">Cat<span slot="subtext">Medium</span></gux-option-multi>
  </gux-listbox-multi>
</gux-dropdown-multi>
`;
const language = 'en';

describe('gux-dropdown', () => {
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdownMulti);
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('select-all functionality', () => {
    const selectAllHtml = `
      <gux-dropdown-multi>
        <gux-listbox-multi aria-label="Animals">
          <gux-select-all></gux-select-all>
          <gux-option-multi value="a">Ant</gux-option-multi>
          <gux-option-multi value="b">Bat</gux-option-multi>
          <gux-option-multi value="c">Cat</gux-option-multi>
        </gux-listbox-multi>
      </gux-dropdown-multi>
    `;

    it('can reopen dropdown after select-all, close, and clear', async () => {
      const page = await newSpecPage({
        components,
        html: selectAllHtml,
        language
      });
      const dropdownElement = page.root as HTMLGuxDropdownMultiElement;
      const selectAll = page.root.querySelector(
        'gux-select-all'
      ) as HTMLGuxSelectAllElement;
      const fieldButton = page.root.shadowRoot.querySelector(
        'button.gux-field-button'
      ) as HTMLButtonElement;

      fieldButton.click();
      await page.waitForChanges();
      expect(fieldButton.getAttribute('aria-expanded')).toBe('true');

      selectAll.click();
      await page.waitForChanges();
      expect(dropdownElement.value).toBe('a,b,c');

      fieldButton.click();
      await page.waitForChanges();
      expect(fieldButton.getAttribute('aria-expanded')).toBe('false');

      const clearEvent = new CustomEvent('internalclearselected');
      dropdownElement.dispatchEvent(clearEvent);
      await page.waitForChanges();
      expect(dropdownElement.value).toBeUndefined();
      expect(fieldButton.getAttribute('aria-expanded')).toBe('false');

      fieldButton.click();
      await page.waitForChanges();
      expect(fieldButton.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
