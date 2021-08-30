import { newE2EPage } from '@stencil/core/testing';

describe('gux-column-chart-beta', () => {
  describe('#render', () => {
    [
      {
        description: 'should render chart',
        html: '<gux-column-chart-beta id="visualization-1"></gux-column-chart-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-column-chart-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
