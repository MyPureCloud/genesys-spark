import { newSpecPage } from '@test/specTestUtils';
import { GuxLineChart } from '../gux-chart-line';

const components = [GuxLineChart];
const language = 'en';

describe('gux-chart-line-beta', () => {
  it('should build', async () => {
    const html =
      '<gux-chart-line-beta x-field-name="date" y-field-name="value"></gux-chart-line-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxLineChart);
  });

  it('should reflect user option to make slant x axis tick labels', async () => {
    let html =
      '<gux-chart-line-beta x-field-name="date" y-field-name="value"></gux-chart-line-beta>';
    let page = await newSpecPage({ components, html, language });

    expect(page.rootInstance.xTickLabelSlant).toBeUndefined();
    expect(page.rootInstance.baseChartSpec.config.axisX.labelAngle).toBe(0);

    html =
      '<gux-chart-line-beta x-field-name="date" y-field-name="value" x-tick-label-slant="true"></gux-chart-line-beta>';
    page = await newSpecPage({ components, html, language });

    expect(page.rootInstance.xTickLabelSlant).toBeTruthy();
    expect(page.rootInstance.baseChartSpec.config.axisX.labelAngle).toBe(45);
  });
});
