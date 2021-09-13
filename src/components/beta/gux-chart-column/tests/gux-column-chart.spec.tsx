import { newSpecPage } from '@stencil/core/testing';
import { GuxColumnChart } from '../gux-chart-column';

const components = [GuxColumnChart];
const language = 'en';

const chartData = {
  values: [
    { category: 'a', value: 4 },
    { category: 'b', value: 6 },
    { category: 'c', value: 10 },
    { category: 'd', value: 3 },
    { category: 'e', value: 10 },
    { category: 'f', value: 20 }
  ]
};

describe('guxchart-column-beta', () => {
  it('should build', async () => {
    const html = '<gux-chart-column-beta></gux-chart-column-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxColumnChart);
  });
});
