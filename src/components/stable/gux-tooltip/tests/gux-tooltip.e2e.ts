import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

describe('gux-tooltip', () => {
  describe('#render', () => {
    [
      `
        <div id="element" lang="en">
          <div>Element</div>
          <gux-tooltip>Tooltip</gux-tooltip>
        </div>
      `,
      `
        <div lang="en">
          <div id="element">Element</div>
          <gux-tooltip for="element">Tooltip</gux-tooltip>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('#element');
        const tooltip = await page.find('gux-tooltip');
        await a11yCheck(page);

        expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
        expect(tooltip.getAttribute('data-popper-placement')).toBe(
          'bottom-start'
        );
        expect(tooltip).toHaveAttribute('hydrated');
      });
    });
  });
});
