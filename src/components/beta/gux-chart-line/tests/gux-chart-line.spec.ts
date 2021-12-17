import { newSpecPage } from '@stencil/core/testing';
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
});
