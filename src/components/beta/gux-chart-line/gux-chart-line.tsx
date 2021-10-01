import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

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

  @Prop()
  chartData: Record<string, unknown>;

  @Prop()
  includeLegend: boolean;

  @Prop()
  includeDataPointMarkers: boolean;

  @Prop()
  xFieldName: string;

  @Prop()
  xAxisTitle: string;

  @Prop()
  yFieldName: string;

  @Prop()
  yAxisTitle: string;

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
      throw new Error(
        `[gux-chart-line] requires x-field-name and y-field-name`
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
    const colorFieldName = this.colorFieldName;
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
