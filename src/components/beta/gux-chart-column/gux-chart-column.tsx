import { Component, Element, Host, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

const DEFAULT_X_FIELD_NAME = 'date';
const DEFAULT_Y_FIELD_NAME = 'value';
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
      x: { field: DEFAULT_X_FIELD_NAME, type: 'nominal' },
      y: { field: DEFAULT_Y_FIELD_NAME, type: 'quantitative' },
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
  chartLayers: string[];

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color = { field: 'category' };
    }

    const xFieldName = this.xFieldName;
    const yFieldName = this.yFieldName;

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
              field: xFieldName || 'category',
              type: 'nominal'
            },
            y: {
              field: yFieldName || 'value',
              type: 'quantitative'
            }
          }
        };
      });
      this.baseChartSpec.layer = layers;
    } else {
      if (xFieldName) {
        this.baseChartSpec.encoding.x.field = this.xFieldName;
      }

      if (yFieldName) {
        this.baseChartSpec.encoding.y.field = this.yFieldName;
      }
    }

    // Set up colors for legend and bars
    const rangeField = this.xFieldName || DEFAULT_X_FIELD_NAME;
    const rangeConfig = {
      [rangeField]: [
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
