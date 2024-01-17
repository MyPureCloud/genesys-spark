import { newSpecPage } from '@test/specTestUtils';
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

  it('should reflect user option to make slant x axis tick labels', async () => {
    let html =
      '<gux-chart-column-beta x-field-name="date" y-field-name="value"></gux-chart-column-beta>';
    let page = await newSpecPage({ components, html, language });

    expect(page.rootInstance.xTickLabelSlant).toBeUndefined();
    expect(page.rootInstance.baseChartSpec.config.axisX.labelAngle).toBe(0);

    html =
      '<gux-chart-column-beta x-field-name="date" y-field-name="value" x-tick-label-slant="true"></gux-chart-column-beta>';
    page = await newSpecPage({ components, html, language });

    expect(page.rootInstance.xTickLabelSlant).toBeTruthy();
    expect(page.rootInstance.baseChartSpec.config.axisX.labelAngle).toBe(45);
  });
});
