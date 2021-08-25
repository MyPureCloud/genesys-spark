import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Prop,
  Watch,
  Listen
} from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-line-chart.less',
  tag: 'gux-line-chart'
})
export class GuxLineChart {
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
  chartData: Record<string, unknown>;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    const spec = Object.assign(this.baseChartSpec, chartData);
    this.visualizationSpec = spec;
  }

  async componentWillRender(): Promise<void> {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <Host>
        <gux-visualization-beta
          visualizationSpec={this.visualizationSpec}
        ></gux-visualization-beta>
      </Host>
    );
  }
}
