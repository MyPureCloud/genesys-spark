import { Component, Element, Host, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-column-chart.less',
  tag: 'gux-column-chart-beta'
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
    config: {
      legend: {
        symbolType: 'circle'
      },

      bar: {
        color: '#203B73'
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

  @Prop()
  chartEncoding: Record<string, unknown>;

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

    const chartEncoding = {};
    if (this.chartEncoding) {
      chartLayer = { encoding: this.chartEncoding };
    }

    const spec = Object.assign(
      this.baseChartSpec,
      chartData,
      chartLayer,
      chartEncoding
    );
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
        <svg>
          <defs>
            <pattern
              id="diagonalHatch0"
              patternUnits="userSpaceOnUse"
              width="7"
              height="4"
              patternTransform="rotate(45)"
            >
              <rect width="2" height="4" fill="#203b73"></rect>
            </pattern>
          </defs>
        </svg>
      </Host>
    );
  }
}
