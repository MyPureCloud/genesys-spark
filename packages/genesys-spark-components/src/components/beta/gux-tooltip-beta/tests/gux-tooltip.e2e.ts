import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-tooltip-beta', () => {
  describe('#render', () => {
    [
      `
        <div id="element" lang="en">
          <div>Element</div>
          <gux-tooltip-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-beta>
        </div>
      `,
      `
        <div lang="en">
          <div id="element">Element</div>
          <gux-tooltip-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-beta>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('#element');
        const tooltip = await page.find('gux-tooltip-beta');
        const baseTooltip = await page.find('pierce/gux-tooltip-base-beta');

        expect(baseTooltip.className.split(' ')).not.toContain('gux-show');
        await element.hover();
        await page.waitForChanges();

        await a11yCheck(page);

        expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
        expect(baseTooltip.className.split(' ')).toContain('gux-show');
        expect(await baseTooltip.getProperty('placement')).toBe('bottom-start');
        expect(tooltip).toHaveAttribute('hydrated');
      });
    });
  });
});
