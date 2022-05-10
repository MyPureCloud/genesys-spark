import { newSpecPage } from '@stencil/core/testing';

import { GuxDropdown } from '../gux-dropdown';
import { GuxListbox } from '../../gux-listbox/gux-listbox';
import { GuxOption } from '../../gux-listbox/gux-option/gux-option';

const components = [GuxDropdown, GuxListbox, GuxOption];
const html = `
<gux-dropdown lang="en" value="j">
  <gux-listbox aria-label="Animals">
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
const language = 'en';

describe('gux-dropdown', () => {
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });
  });
});
