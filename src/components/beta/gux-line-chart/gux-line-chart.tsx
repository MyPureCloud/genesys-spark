import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-line-chart.less',
  tag: 'gux-line-chart-beta'
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
      interpolate: 'linear',
      point: false
    },
    config: {
      legend: {
        symbolType: 'circle'
      },
      range: {
        category: [
          '#203B73',
          '#1DA8B3',
          '#75A8FF',
          '#8452CF',
          '#B5B5EB',
          '#CC3EBE',
          '#5E5782',
          '#FF8FDD',
          '#868C1E',
          '#DDD933'
        ]
      }
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
      color: {
        type: 'nominal',
        field: 'category',
        scale: {
          range: [
            '#203B73',
            '#1DA8B3',
            '#75A8FF',
            '#8452CF',
            '#B5B5EB',
            '#CC3EBE',
            '#5E5782',
            '#FF8FDD',
            '#868C1E',
            '#DDD933'
          ]
        }
      }
    }
  };

  @Prop()
  chartData: Record<string, unknown>;

  @Prop()
  chartSpecs: Record<string, unknown>;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    let chartSpecs = {};
    if (this.chartSpecs) {
      chartSpecs = this.chartSpecs;
    }
    const spec = Object.assign(this.baseChartSpec, chartData, chartSpecs);
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
