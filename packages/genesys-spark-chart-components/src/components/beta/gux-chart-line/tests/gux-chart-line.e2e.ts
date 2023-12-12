import { newE2EPage } from '@stencil/core/testing';

describe('gux-chart-line-beta', () => {
  describe('#render', () => {
    [
      {
        description: 'should render chart',
        html: '<gux-chart-line-beta x-field-name="date" y-field-name="value"></gux-chart-line-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-chart-line-beta');

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
