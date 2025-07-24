import {
  a11yCheck,
  newSparkE2EPage,
  waitForTimeout
} from '../../../../test/e2eTestUtils';

describe('gux-tooltip-beta', () => {
  describe('#render', () => {
    [
      `
        <div id="element" lang="en">
          <div>Element</div>
          <gux-tooltip-pointer-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-pointer-beta>
        </div>
      `,
      `
        <div lang="en">
          <div id="element">Element</div>
          <gux-tooltip-pointer-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-pointer-beta>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('#element');
        const tooltip = await page.find('gux-tooltip-pointer-beta');
        const baseTooltip = await tooltip.find('pierce/gux-tooltip-base-beta');

        expect(baseTooltip.className.split(' ')).not.toContain('gux-show');
        // verify accessibility issues are not present before tooltip is active
        await a11yCheck(page);

        await element.hover();
        await waitForTimeout(2000);

        await a11yCheck(page);

        expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
        expect(baseTooltip.className.split(' ')).toContain('gux-show');
        expect(await baseTooltip.getProperty('placement')).toBe('bottom-start');
        expect(tooltip).toHaveAttribute('hydrated');
      });
    });
  });
});
