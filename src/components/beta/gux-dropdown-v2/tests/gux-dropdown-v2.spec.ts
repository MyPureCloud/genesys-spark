import { newSpecPage } from '@stencil/core/testing';

import { GuxDropdownV2Beta } from '../gux-dropdown-v2';
import { GuxListbox } from '../../gux-listbox/gux-listbox';
import { GuxOptionV2 } from '../../gux-listbox/gux-option-v2/gux-option-v2';

const components = [GuxDropdownV2Beta, GuxListbox, GuxOptionV2];
const html = `
<gux-dropdown-v2-beta lang="en" value="j">
  <gux-listbox aria-label="Animals">
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
const language = 'en';

describe('gux-dropdown-menu-v2', () => {
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdownV2Beta);
      expect(page.root).toMatchSnapshot();
    });
  });
});
