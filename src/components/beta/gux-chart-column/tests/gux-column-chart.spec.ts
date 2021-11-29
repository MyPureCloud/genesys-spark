import { newSpecPage } from '@stencil/core/testing';
import { GuxColumnChart } from '../gux-chart-column';

const components = [GuxColumnChart];
const language = 'en';

describe('gux-chart-column-beta', () => {
  it('should build', async () => {
    const html =
      '<gux-chart-column-beta x-field-name="date" y-field-name="value"></gux-chart-column-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxColumnChart);
  });
});
