import { newSpecPage } from '@test/specTestUtils';
import { GuxPieChart } from '../gux-chart-pie';

const components = [GuxPieChart];
const language = 'en';

describe('gux-chart-pie-beta', () => {
  it('should build', async () => {
    const html = '<gux-chart-pie-beta outer-radius="80"></gux-chart-pie-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxPieChart);
  });
});
