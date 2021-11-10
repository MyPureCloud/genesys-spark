import { newSpecPage } from '@stencil/core/testing';
import { GuxVisualization } from '../gux-visualization';

const components = [GuxVisualization];
const language = 'en';
const visualizationSpecLine = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  data: { url: 'https://vega.github.io/editor/data/seattle-weather.csv' },
  mark: {
    type: 'line',
    interpolate: 'monotone'
  },
  encoding: {
    x: { timeUnit: 'month', field: 'date', bandPosition: 0.5 },
    y: { aggregate: 'mean', field: 'temp_max' }
  }
};

describe.skip('gux-visualization-beta', () => {
  describe('#render', () => {
    [
      {
        description: 'should render default button',
        html: '<gux-visualization-beta></gux-visualization-beta>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });
        const element = page.root;

        element.visualizationSpec = visualizationSpecLine;

        await page.waitForChanges();

        expect(page.rootInstance).toBeInstanceOf(GuxVisualization);
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
