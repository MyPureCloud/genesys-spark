import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-tooltip', () => {
  describe('#render', () => {
    [
      `
        <div id="element" lang="en">
          <div>Element</div>
          <gux-tooltip>
            <div slot="content">Tooltip</div>
          </gux-tooltip>
        </div>
      `,
      `
        <div lang="en">
          <div id="element">Element</div>
          <gux-tooltip for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('#element');
        const tooltip = await page.find('gux-tooltip');
        expect(tooltip.className.split(' ')).not.toContain('gux-show');
        await element.hover();
        await page.waitForChanges();

        await a11yCheck(page);

        expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
        expect(tooltip.className.split(' ')).toContain('gux-show');
        expect(tooltip.getAttribute('data-placement')).toBe('bottom-start');
        expect(tooltip).toHaveAttribute('hydrated');
      });
    });
  });
});
