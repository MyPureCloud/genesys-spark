import { newSpecPage } from '@test/specTestUtils';
import { GuxDonutChart } from '../gux-chart-donut';

const components = [GuxDonutChart];
const language = 'en';

describe('gux-chart-donut-beta', () => {
  it('should build', async () => {
    const html =
      '<gux-chart-donut-beta inner-radius="20" outer-radius="80"></gux-chart-donut-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxDonutChart);
  });
});
