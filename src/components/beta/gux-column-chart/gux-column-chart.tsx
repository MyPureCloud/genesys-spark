import { Component, Element, h, JSX, Prop, Watch, Listen } from '@stencil/core';
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
  chartData: Record<string, unknown>;

  @Prop()
  chartLayer: Record<string, unknown>;

  @Prop()
  embedOptions: EmbedOptions;

  columnChartSpec: string;

  @Watch('chartData')
  parseData() {
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    let chartLayer = {};
    if (this.chartLayer) {
      chartLayer = { layer: this.chartLayer };
    }
    const spec = Object.assign(this.baseChartSpec, chartData, chartLayer);
    this.visualizationSpec = spec;
  }

  async componentWillRender(): Promise<void> {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <gux-visualization-beta
        visualizationSpec={this.visualizationSpec}
      ></gux-visualization-beta>
    );
  }
}
