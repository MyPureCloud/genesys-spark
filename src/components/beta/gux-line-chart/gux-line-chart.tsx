import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import embed, { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-line-chart.less',
  tag: 'gux-line-chart'
})
export class GuxLineChart {
  private defaultVisualizationSpec: VisualizationSpec = {};

  private defaultEmbedOptions: EmbedOptions = {
    actions: false,
    renderer: 'svg'
  };

  @Element()
  root: HTMLElement;

  @Prop()
  visualizationSpec: VisualizationSpec;

  @Prop()
  baseChartSpec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: {
      type: 'line',
      interpolate: 'monotone',
      point: true
    },
    encoding: {
      x: {
        field: 'date',
        type: 'temporal'
      },
      y: {
        field: 'value',
        type: 'quantitative'
      },
      tooltip: {
        field: 'value',
        type: 'quantitative'
      },
      color: {
        field: 'category',
        type: 'nominal',
        legend: null
      }
    }
  };

  @Prop()
  chartData: string;

  @Prop()
  embedOptions: EmbedOptions;

  lineChartSpec: string;

  @Watch('chartData')
  parseData() {
    if (this.chartData) {
      const data = JSON.parse(this.chartData);
      const chartSpec = Object.assign(this.baseChartSpec, { data });
      this.lineChartSpec = JSON.stringify(chartSpec);
    }
  }

  async componentWillRender(): Promise<void> {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <gux-visualization-beta
        visualization-spec={this.lineChartSpec}
      ></gux-visualization-beta>
    );
  }
}
