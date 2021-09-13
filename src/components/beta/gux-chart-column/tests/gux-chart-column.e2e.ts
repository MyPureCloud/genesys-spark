import { newE2EPage } from '@stencil/core/testing';

describe('gux-chart-column-beta', () => {
  describe('#render', () => {
    [
      {
        description: 'should render chart',
        html: '<gux-chart-column-beta id="visualization-1"></gux-chart-column-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-chart-column-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
