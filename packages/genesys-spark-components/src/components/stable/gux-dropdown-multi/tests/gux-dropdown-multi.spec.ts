import { newSpecPage } from '@test/specTestUtils';

import { GuxDropdownMulti } from '../gux-dropdown-multi';
import { GuxListboxMulti } from '../../gux-listbox-multi/gux-listbox-multi';
import { GuxOptionMulti } from '../../gux-listbox-multi/gux-option-multi/gux-option-multi';

const components = [GuxDropdownMulti, GuxListboxMulti, GuxOptionMulti];
const html = `
<gux-dropdown-multi>
  <gux-listbox-multi aria-label="Animals">
    <gux-option-multi value="a" disabled>Ant</gux-option-multi>
    <gux-option-multi value="b">Bat</gux-option-multi>
    <gux-option-multi value="c">Cat</gux-option-multi>
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
});
