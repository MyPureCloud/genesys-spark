import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '../../../usage-tracking';

const DEFAULT_X_FIELD_NAME = 'date';
const DEFAULT_Y_FIELD_NAME = 'value';
const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_COLOR_SCALE = [
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
];
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
      x: { field: DEFAULT_X_FIELD_NAME, type: 'nominal' },
      y: { field: DEFAULT_Y_FIELD_NAME, type: 'quantitative' },
      color: {
        field: DEFAULT_COLOR_FIELD_NAME,
        type: 'nominal',
        scale: { range: DEFAULT_COLOR_SCALE },
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
        field: colorFieldName || DEFAULT_COLOR_FIELD_NAME,
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
