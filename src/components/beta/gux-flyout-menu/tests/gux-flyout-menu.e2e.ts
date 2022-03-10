import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-flyout-menu', () => {
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

  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu-beta');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('hover', () => {
    it('opens flyout menu', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu-beta');
      const menuWrapper = await element.find('pierce/.gux-flyout-menu-wrapper');

      expect(menuWrapper).not.toHaveClass('gux-shown');
      await element.hover();
      await page.waitForChanges();
      await a11yCheck(page);

      expect(menuWrapper).toHaveClass('gux-shown');
    });
    it('opens submenus', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu-beta');
      await element.hover();
      await page.waitForChanges();
      const submenu = await page.find('gux-submenu');
      const submenuWrapper = await submenu.find('pierce/.gux-submenu-wrapper');
      await submenu.hover();
      await page.waitForChanges();
      await a11yCheck(page);

      expect(submenuWrapper).toHaveClass('gux-shown');
    });
  });
});
