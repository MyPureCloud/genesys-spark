import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

import { logError } from '../../../utils/error/log-error';

const DEFAULT_COLOR_FIELD_NAME = 'category';
@Component({
  styleUrl: 'gux-chart-line.less',
  tag: 'gux-chart-line-beta'
})
export class GuxLineChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: {
      type: 'line',
      interpolate: 'linear',
      point: false
    },
    config: {
      legend: {
        symbolType: 'circle'
      }
    },
    encoding: {
      x: { type: 'nominal' },
      y: { type: 'quantitative' },
      color: {
        field: DEFAULT_COLOR_FIELD_NAME,
        type: 'nominal',
        scale: { range: VISUALIZATION_COLORS },
        legend: null
      },
      tooltip: { aggregate: 'count', type: 'quantitative' }
    }
  };

  /**
   * Data to be rendered in the chart.
   * Data field names must match the values you set in xFieldName and yFieldName
   */
  @Prop()
  chartData: Record<string, unknown>;

  @Prop()
  includeLegend: boolean;

  @Prop()
  includeDataPointMarkers: boolean;

  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. xFieldName of "category" will map any "category" fields in chartData to the x-axis
   */
  @Prop()
  xFieldName: string;

  /**
   * Title to display along the x-axis
   */
  @Prop()
  xAxisTitle: string;

  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. yFieldName of "value" will map any "value" fields in chartData to the y-axis
   */
  @Prop()
  yFieldName: string;

  /**
   * Title to display along the y-axis
   */
  @Prop()
  yAxisTitle: string;

  /**
   * Title to display above the optional legend
   */
  @Prop()
  legendTitle: string;

  @Prop()
  colorFieldName: string;

  @Prop()
  includeStrokeDash: boolean;

  @Prop()
  interpolation: string;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      logError(
        'gux-chart-line',
        '[gux-chart-line] requires x-field-name and y-field-name'
      );
    }

    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = true;
    }

    const xFieldName = this.xFieldName;
    const xAxisTitle = this.xAxisTitle;
    const yFieldName = this.yFieldName;
    const yAxisTitle = this.yAxisTitle;
    const legendTitle = this.legendTitle;
    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;
    const interpolation = this.interpolation;
    const includeStrokeDash = this.includeStrokeDash;
    const includeDataPointMarkers = this.includeDataPointMarkers;

    if (xFieldName) {
      this.baseChartSpec.encoding.x.field = xFieldName;
    }

    if (xAxisTitle) {
      this.baseChartSpec.encoding.x.title = xAxisTitle;
    }

    if (yFieldName) {
      this.baseChartSpec.encoding.y.field = yFieldName;
    }

    if (yAxisTitle) {
      this.baseChartSpec.encoding.y.title = yAxisTitle;
    }

    if (colorFieldName) {
      this.baseChartSpec.encoding.color.field = colorFieldName;
    }

    if (legendTitle) {
      this.baseChartSpec.encoding.color.title = legendTitle;
    }

    if (includeStrokeDash) {
      this.baseChartSpec.encoding.strokeDash = {
        field: colorFieldName,
        type: 'nominal'
      };
    }

    if (interpolation) {
      this.baseChartSpec.mark.interpolate = interpolation;
    }

    if (includeDataPointMarkers) {
      this.baseChartSpec.mark.point = includeDataPointMarkers;
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
