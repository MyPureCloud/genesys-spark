import { Component, Element, Host, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

@Component({
  styleUrl: 'gux-chart-column.less',
  tag: 'gux-chart-column-beta'
})
export class GuxColumnChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: { type: 'bar', width: 16 },
    config: {
      legend: {
        symbolType: 'circle'
      },
      bar: {
        color: '#203B73'
      }
    },
    encoding: {
      x: { type: 'nominal' },
      y: { type: 'quantitative' },
      tooltip: { aggregate: 'count', type: 'quantitative' }
    }
  };

  @Prop()
  chartData: Record<string, unknown>;

  @Prop()
  includeLegend: boolean;

  @Prop()
  xFieldName: string;

  @Prop()
  yFieldName: string;

  @Prop()
  xAxisTitle: string;

  @Prop()
  yAxisTitle: string;

  @Prop()
  legendTitle: string;

  @Prop()
  chartLayers: string[];

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      throw new Error(
        `[gux-chart-column] requires x-field-name and y-field-name`
      );
    }

    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color = { field: 'category' };
    }

    const xFieldName = this.xFieldName;
    const yFieldName = this.yFieldName;
    const xAxisTitle = this.xAxisTitle;
    const yAxisTitle = this.yAxisTitle;
    const legendTitle = this.legendTitle;

    if (this.chartLayers) {
      const layers = this.chartLayers.map(layerName => {
        return {
          mark: 'bar',
          transform: [
            {
              filter: { field: 'series', equal: layerName }
            }
          ],
          encoding: {
            x: {
              field: xFieldName,
              type: 'nominal'
            },
            y: {
              field: yFieldName,
              type: 'quantitative'
            }
          }
        };
      });
      this.baseChartSpec.layer = layers;
    } else {
      if (xFieldName) {
        this.baseChartSpec.encoding.x.field = xFieldName;
      }

      if (yFieldName) {
        this.baseChartSpec.encoding.y.field = yFieldName;
      }

      if (xAxisTitle) {
        this.baseChartSpec.encoding.x.title = xAxisTitle;
      }

      if (yAxisTitle) {
        this.baseChartSpec.encoding.y.title = yAxisTitle;
      }

      if (legendTitle) {
        this.baseChartSpec.encoding.color.title = legendTitle;
      }
    }

    // Set up colors for legend and bars
    const rangeField = xFieldName;
    const rangeConfig = {
      [rangeField]: VISUALIZATION_COLORS
    };
    this.baseChartSpec.config.range = rangeConfig;
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
