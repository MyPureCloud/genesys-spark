/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
@Component({
  styleUrl: 'gux-chart-donut.less',
  tag: 'gux-chart-donut-beta'
})
export class GuxDonutChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    encoding: {
      theta: { field: 'value', type: 'quantitative', stack: true },
      color: {
        field: DEFAULT_COLOR_FIELD_NAME,
        type: 'nominal',
        scale: { range: VISUALIZATION_COLORS },
        legend: null
      },
      tooltip: { aggregate: 'count', type: 'quantitative' }
    },
    layer: [
      {
        mark: { type: 'arc', outerRadius: 80 }
      },
      {
        mark: { type: 'text', radius: 90 },
        encoding: {
          text: { field: DEFAULT_LABEL_FIELD_NAME, type: 'quantitative' }
        }
      }
    ],
    view: { stroke: null }
  };

  /**
   * Data to be rendered in the chart.
   * Data field names must match the values you set in xFieldName and yFieldName
   */
  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: Record<string, any>;

  @Prop()
  includeLegend: boolean;

  @Prop()
  legendTitle: string;

  @Prop()
  colorFieldName: string;

  /**
   * List specifying the values for layers.
   * Layers may use outerRadius, innerRadius, and stroke.
   */
  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartLayers: Record<string, any>[];

  @Prop()
  labelRadius: number;

  @Prop()
  labelField: string;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = true;
    }

    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;

    if (colorFieldName) {
      this.baseChartSpec.encoding.color.field = colorFieldName;
    }

    const legendTitle = this.legendTitle;
    if (legendTitle) {
      this.baseChartSpec.encoding.color.title = legendTitle;
    }

    const chartLayers = this.chartLayers;
    if (chartLayers) {
      const layers = chartLayers.map(chartLayer => {
        return {
          mark: Object.assign({ type: 'arc' }, chartLayer)
        };
      });
      this.baseChartSpec.layer = layers;
    }

    const labelRadius = this.labelRadius;
    const labelField = this.labelField || DEFAULT_LABEL_FIELD_NAME;
    if (labelRadius) {
      if (!this.baseChartSpec.layer) {
        this.baseChartSpec.layer = [];
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.baseChartSpec.layer.push({
        mark: { type: 'text', radius: labelRadius },
        encoding: {
          text: { field: labelField, type: 'quantitative' }
        }
      });
    }

    const spec = Object.assign(this.baseChartSpec, chartData);
    this.visualizationSpec = spec;
  }

  componentWillRender(): void {
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
    ) as JSX.Element;
  }
}
