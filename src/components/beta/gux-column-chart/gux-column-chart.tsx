import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-column-chart.less',
  tag: 'gux-column-chart'
})
export class GuxColumnChart {
  @Element()
  root: HTMLElement;

  @Prop()
  visualizationSpec: VisualizationSpec;

  @Prop()
  baseChartSpec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: { type: 'bar', width: 16 },
    encoding: {
      x: { field: 'category', type: 'nominal' },
      y: { field: 'value', type: 'quantitative' },
      tooltip: { aggregate: 'count', type: 'quantitative' }
    }
  };

  @Prop()
  chartData: string;

  @Prop()
  embedOptions: EmbedOptions;

  columnChartSpec: string;

  @Watch('chartData')
  parseData() {
    if (this.chartData) {
      const data = JSON.parse(this.chartData);
      const chartSpec = Object.assign(this.baseChartSpec, { data });
      this.columnChartSpec = JSON.stringify(chartSpec);
    }
  }

  async componentWillRender(): Promise<void> {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <gux-visualization-beta
        visualization-spec={this.columnChartSpec}
      ></gux-visualization-beta>
    );
  }
}
