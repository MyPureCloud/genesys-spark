import { newE2EPage } from '@stencil/core/testing';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('gux-tooltip-beta', () => {
  describe('#render', () => {
    [
      `
        <div id="element" lang="en">
          <div>Element</div>
          <gux-tooltip-beta>Tooltip</gux-tooltip-beta>
        </div>
      `,
      `
        <div lang="en">
          <div id="element">Element</div>
          <gux-tooltip-beta for="element">Tooltip</gux-tooltip-beta>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage({ html });

        const element = await page.find('#element');
        const tooltip = await page.find('gux-tooltip-beta');

        expect(element.getAttribute('aria-describedby')).toBe(tooltip.id);
        expect(element).toHaveClass('gux-tooltip-for-element');
        expect(tooltip.getAttribute('data-popper-placement')).toBe(
          'bottom-start'
        );
        expect(tooltip).toHaveClass('hydrated');
      });
    });
  });
});
