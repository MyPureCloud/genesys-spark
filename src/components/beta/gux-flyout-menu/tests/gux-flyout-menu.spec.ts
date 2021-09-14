import { newSpecPage } from '@stencil/core/testing';

import { GuxFlyoutMenu } from '../gux-flyout-menu';
import { GuxMenu } from '../gux-menu/gux-menu';
import { GuxSubmenu } from '../gux-menu/gux-submenu/gux-submenu';
import { GuxMenuOption } from '../gux-menu/gux-menu-option/gux-menu-option';

const components = [GuxFlyoutMenu, GuxMenu, GuxSubmenu, GuxMenuOption];
const html = `
  <gux-flyout-menu-beta>
    <span slot="target">Example Target Element</span>
    <gux-menu slot="menu">
      <gux-menu-option>Option One</gux-menu-option>
      <gux-submenu label="Submenu Two">
        <gux-menu-option>Option One</gux-menu-option>
        <gux-submenu label="Submenu Two">
          <gux-menu-option>Option One</gux-menu-option>
          <gux-menu-option>Option Two</gux-menu-option>
          <gux-menu-option>Option Three</gux-menu-option>
        </gux-submenu>
        <gux-menu-option>Option Three</gux-menu-option>
      </gux-submenu>
      <gux-menu-option>Option Three</gux-menu-option>
      <gux-menu-option>Option Four</gux-menu-option>
      <gux-submenu label="Submenu Five">
        <gux-menu-option>Option One</gux-menu-option>
        <gux-menu-option>Option Two</gux-menu-option>
        <gux-submenu label="Submenu Three">
          <gux-menu-option>Option One</gux-menu-option>
          <gux-submenu label="Submenu Two">
            <gux-menu-option>Option One</gux-menu-option>
            <gux-submenu label="Submenu Two">
              <gux-menu-option>Option One</gux-menu-option>
              <gux-menu-option>Option Two</gux-menu-option>
              <gux-menu-option>Option Three</gux-menu-option>
            </gux-submenu>
            <gux-menu-option>Option Three</gux-menu-option>
          </gux-submenu>
          <gux-menu-option>Option Three</gux-menu-option>
        </gux-submenu>
      </gux-submenu>
    </gux-menu>
  </gux-flyout-menu-beta>
`;
const language = 'en';

describe('gux-flyout-menu', () => {
  beforeEach(() => {
    // This is mocked because Popperjs logs an error as the node_env is
    // set to "test" and // the newSpecPage fails an isHTMLElement check
    jest.spyOn(console, 'error').mockImplementation();
  });

  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxFlyoutMenu);
      expect(page.root).toMatchSnapshot();
      expect(console.error).toHaveBeenCalledWith(
        'Popper: "arrow" element must be an HTMLElement (not an SVGElement). To use an SVG arrow, wrap it in an HTMLElement that will be used as the arrow.'
      );
    });
  });
});
