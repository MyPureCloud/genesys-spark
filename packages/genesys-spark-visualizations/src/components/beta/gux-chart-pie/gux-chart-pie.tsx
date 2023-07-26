/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '@utils/tracking/usage';

import { logError } from '../../../utils/error/log-error';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
@Component({
  styleUrl: 'gux-chart-pie.less',
  tag: 'gux-chart-pie-beta',
  shadow: true
})
export class GuxPieChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    config: {
      legend: {
        symbolType: 'circle'
      }
    },
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
  legendPosition:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'none' = 'right';

  @Prop()
  legendTitle: string;

  @Prop()
  colorFieldName: string;

  @Prop()
  outerRadius: number;

  @Prop()
  labelRadius: number;

  @Prop()
  labelField: string;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    if (!this.outerRadius) {
      logError(this.root, 'requires outer-radius');
    }

    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = true;
    }

    if (this.legendPosition) {
      this.baseChartSpec.config.legend.orient = this.legendPosition;
    }

    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;

    if (colorFieldName) {
      this.baseChartSpec.encoding.color.field = colorFieldName;
    }

    const legendTitle = this.legendTitle;
    if (legendTitle) {
      this.baseChartSpec.encoding.color.title = legendTitle;
    }

    const outerRadius = this.outerRadius;

    this.baseChartSpec.layer = [
      {
        mark: { type: 'arc', outerRadius }
      }
    ];

    const labelRadius = this.labelRadius;
    const labelField = this.labelField || DEFAULT_LABEL_FIELD_NAME;
    if (labelRadius) {
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

  componentWillLoad(): void {
    trackComponent(this.root);
    this.parseData();
  }

  render(): JSX.Element {
    return (
      <gux-visualization-beta
        visualizationSpec={this.visualizationSpec}
      ></gux-visualization-beta>
    ) as JSX.Element;
  }
}
