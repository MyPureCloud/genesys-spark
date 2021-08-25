import { newSpecPage } from '@stencil/core/testing';
import { GuxColumnChart } from '../gux-column-chart';

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

describe('gux-column-chart-beta', () => {
  it('should build', async () => {
    const html = '<gux-column-chart-beta></gux-column-chart-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxColumnChart);
  });
});
