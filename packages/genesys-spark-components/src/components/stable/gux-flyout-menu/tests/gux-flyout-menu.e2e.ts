import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'aria-required-children',
    target: '#target-menu',
    exclusionReason:
      'Role menuitem is applied using ElementInternals which AxeTesting does not detect (https://github.com/dequelabs/axe-core/issues/4259). Manually confirmed to work.'
  },
  {
    issueId: 'aria-required-children',
    target:
      '#target-menu > gux-submenu[label="Submenu Two"],.gux-submenu-content[role="menu"]',
    exclusionReason:
      'Role menuitem is applied using ElementInternals which AxeTesting does not detect (https://github.com/dequelabs/axe-core/issues/4259). Manually confirmed to work.'
  }
];

describe('gux-flyout-menu', () => {
  const html = `
    <gux-flyout-menu>
      <span slot="target">Example Target Element</span>
      <gux-menu slot="menu" id="target-menu">
        <gux-menu-option>Option One</gux-menu-option>
        <gux-submenu label="Submenu Two">
          <gux-menu-option>Option One</gux-menu-option>
          <gux-submenu id="submenu-two" label="Submenu Two">
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
    </gux-flyout-menu>
  `;

  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu');
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('hover', () => {
    it('opens flyout menu', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu');
      const menuWrapper = await element.find('pierce/.gux-flyout-menu-content');

      expect(menuWrapper).not.toHaveClass('gux-shown');
      await element.hover();
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions);

      expect(menuWrapper).toHaveClass('gux-shown');
    });
    it('opens submenus', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-flyout-menu');
      await element.hover();
      await page.waitForChanges();
      const submenu = await page.find('gux-submenu');
      const submenuWrapper = await submenu.find('pierce/.gux-submenu-wrapper');
      await submenu.hover();
      await page.waitForChanges();
      await a11yCheck(page, axeExclusions);

      expect(submenuWrapper).toHaveClass('gux-shown');
    });
  });
});
