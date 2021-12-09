import { newSpecPage } from '@stencil/core/testing';
import { GuxDonutChart } from '../gux-chart-donut';

const components = [GuxDonutChart];
const language = 'en';

describe('gux-chart-donut-beta', () => {
  it('should build', async () => {
    const html =
      '<gux-chart-donut-beta x-field-name="date" y-field-name="value"></gux-chart-donut-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxDonutChart);
  });
});
