import { newSpecPage } from '@test/specTestUtils';

import { GuxDropdown } from '../gux-dropdown';
import { GuxListbox } from '../../gux-listbox/gux-listbox';
import { GuxOption } from '../../gux-listbox/options/gux-option/gux-option';
import { GuxOptionIcon } from '../../gux-listbox/options/gux-option-icon/gux-option-icon';
import { GuxOptionGroup } from '../../gux-listbox/option-group/gux-option-group';

const language = 'en';

describe('gux-dropdown', () => {
  describe('#render', () => {
    it(`should render as expected with gux-option`, async () => {
      const components = [GuxDropdown, GuxListbox, GuxOption];
      const html = `
      <gux-dropdown lang="en" value="j">
        <gux-listbox aria-label="Animals">
          <gux-option value="a">Ant<span slot="subtext">Small</span></gux-option>
          <gux-option value="b">Bat</gux-option>
          <gux-option value="c">Cat</gux-option>
          <gux-option value="d">Dog</gux-option>
          <gux-option value="e">Eel</gux-option>
          <gux-option value="f">Frog</gux-option>
          <gux-option value="g">Goat</gux-option>
          <gux-option value="h">Horse<span slot="subtext">Large</span></gux-option>
          <gux-option value="i">Ibis</gux-option>
        </gux-listbox>
      </gux-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });

    it(`should render as expected with gux-option-icon`, async () => {
      const components = [GuxDropdown, GuxListbox, GuxOptionIcon];
      const html = `
      <gux-dropdown lang="en" value="j">
        <gux-listbox aria-label="Animals">
          <gux-option-icon
          icon-name="user"
          icon-color="var(--gux-blue-60)"
          value="leonardo"
          >Leonardo<span slot="subtext">TMNT</span></gux-option-icon
        >
        <gux-option-icon icon-name="user" icon-color="#8452cf" value="donatello"
          >Donatello</gux-option-icon
        >
        <gux-option-icon
          icon-name="user"
          icon-color="rgb(234, 11, 11)"
          value="raphael"
          >Raphael</gux-option-icon
        >
        <gux-option-icon
          icon-name="user"
          icon-color="#e08915"
          icon-sr-text="Screenreader information about the icon goes here, if needed"
          value="michelangelo"
          >Michelangelo</gux-option-icon
        >
        </gux-listbox>
      </gux-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });

    it(`should render as expected with gux-option-group and gux-option`, async () => {
      const components = [GuxDropdown, GuxListbox, GuxOption, GuxOptionGroup];
      const html = `
      <gux-dropdown lang="en" value="f">
        <gux-listbox aria-label="Animals">
          <gux-option-group-beta label="Group 1">
            <gux-option value="a">Ant</gux-option>
            <gux-option value="b">Bat</gux-option>
            <gux-option value="c" disabled>Cat</gux-option>
            <gux-option value="d">Dog</gux-option>
          </gux-option-group-beta>
          <gux-option-group-beta label="Group 2">
            <gux-option value="e">Eel</gux-option>
            <gux-option value="f">Frog</gux-option>
            <gux-option value="g">Goat</gux-option>
          </gux-option-group-beta>
          <gux-option-group-beta label="Group 3">
            <gux-option value="h">Horse</gux-option>
            <gux-option value="i">Ibis</gux-option>
          </gux-option-group-beta>
        </gux-listbox>
      </gux-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });

    it(`should render as expected with gux-option-group and gux-option-icon`, async () => {
      const components = [
        GuxDropdown,
        GuxListbox,
        GuxOptionIcon,
        GuxOptionGroup
      ];
      const html = `
      <gux-dropdown lang="en" value="f">
        <gux-listbox aria-label="Animals">
          <gux-option-group-beta label="Group 1">
            <gux-option-icon
            icon-name="user"
            icon-color="var(--gux-blue-60)"
            value="leonardo"
            >Leonardo<span slot="subtext">TMNT</span></gux-option-icon
          >
          <gux-option-icon icon-name="user" icon-color="#8452cf" value="donatello"
            >Donatello</gux-option-icon
          >
          </gux-option-group-beta>
          <gux-option-group-beta label="Group 2">
            <gux-option-icon
              icon-name="user"
              icon-color="rgb(234, 11, 11)"
              value="raphael"
              >Raphael</gux-option-icon
            >
            <gux-option-icon
              icon-name="user"
              icon-color="#e08915"
              icon-sr-text="Screenreader information about the icon goes here, if needed"
              value="michelangelo"
              >Michelangelo</gux-option-icon
            >
          </gux-option-group-beta>
        </gux-listbox>
      </gux-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });
    it(`should render as expected with gux-option whose slotted content includes whitespace`, async () => {
      const components = [GuxDropdown, GuxListbox, GuxOption];
      // With frog option selected below, the snapshot should show the selected item's text with
      // dropdown closed as "Frog"
      // Prior bug only considered first node of slot content, which below is a whitespace text node.
      // And not "Frog Amphibian" because subtext slot should be ignored.
      const html = `
      <gux-dropdown lang="en" value="f">
        <gux-listbox aria-label="Animals">
          <gux-option value="e">Eel</gux-option>
          <gux-option value="f">
            <span>Frog</span>
            <span slot="subtext">Amphibian</span>
          </gux-option>
          <gux-option value="g">Goat</gux-option>
        </gux-listbox>
      </gux-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxDropdown);
      expect(page.root).toMatchSnapshot();
    });
  });
});
