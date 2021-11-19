import { newSpecPage } from '@stencil/core/testing';
import { GuxLineChart } from '../gux-chart-line';

const components = [GuxLineChart];
const language = 'en';

const chartData = {
  values: [
    { date: '2021-01-01', value: 9.4, category: 'a' },
    { date: '2021-01-02', value: 12.8, category: 'a' },
    { date: '2021-01-03', value: 10.6, category: 'a' },
    { date: '2021-01-04', value: 11.7, category: 'a' },
    { date: '2021-01-05', value: 12.2, category: 'a' },
    { date: '2021-01-06', value: 8.9, category: 'a' },
    { date: '2021-01-07', value: 4.4, category: 'a' },
    { date: '2021-01-08', value: 7.2, category: 'a' },
    { date: '2021-01-09', value: 10, category: 'a' },
    { date: '2021-01-10', value: 9.4, category: 'a' },
    { date: '2021-01-11', value: 6.1, category: 'a' },
    { date: '2021-01-12', value: 6.1, category: 'a' }
  ]
};

describe('gux-chart-line-beta', () => {
  it('should build', async () => {
    const html =
      '<gux-chart-line-beta x-field-name="date" y-field-name="value"></gux-chart-line-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxLineChart);
  });
});
