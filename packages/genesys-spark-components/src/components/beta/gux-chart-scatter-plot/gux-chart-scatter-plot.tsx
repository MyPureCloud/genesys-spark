/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '@utils/tracking/usage';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

import { logError } from '../../../utils/error/log-error';

const DEFAULT_COLOR_FIELD_NAME = 'category';
@Component({
  styleUrl: 'gux-chart-scatter-plot.less',
  tag: 'gux-chart-scatter-plot-beta',
  shadow: true
})
export class GuxScatterPlotChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    params: [
      {
        name: 'onHover',
        select: { type: 'point', on: 'mouseover' }
      }
    ],
    config: {
      axis: {
        ticks: false,
        titlePadding: 8,
        gridColor: '#F6F7F9'
      },
      axisX: {
        labelAngle: 0,
        grid: true
      },
      legend: {
        symbolType: 'circle'
      }
    },
    width: { step: 40 },
    encoding: {
      x: { type: 'nominal' },
      y: { type: 'quantitative' },

      color: {
        field: DEFAULT_COLOR_FIELD_NAME,
        type: 'nominal',
        scale: { range: VISUALIZATION_COLORS },
        legend: null
      },
      size: {
        condition: [
          {
            param: 'onHover',
            empty: false,
            value: 100
          }
        ],
        value: 40
      }
    }
  };

  /**
   * Data to be rendered in the chart.
   * Data field names must match the values you set in xFieldName and yFieldName
   */
  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: Record<string, any>;

  /**
   * If true, then make Axis tick label 45 degrees
   */
  @Prop()
  xTickLabelSlant: boolean;

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

  /**
   * Type of category to plot in the chart
   */
  @Prop()
  colorFieldName: string;

  /**
   * The shape of the plotting in the chart - Square, Circle and Point
   */
  @Prop()
  useShape: string;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      logError(this.root, 'requires x-field-name and y-field-name');
    }

    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.xTickLabelSlant) {
      this.baseChartSpec.config.axisX.labelAngle = -45;
    }

    if (this.legendPosition) {
      this.baseChartSpec.config.legend.orient = this.legendPosition;
    }

    const xFieldName = this.xFieldName;
    const xAxisTitle = this.xAxisTitle;
    const yFieldName = this.yFieldName;
    const yAxisTitle = this.yAxisTitle;
    const legendTitle = this.legendTitle;
    const useShape = this.useShape || 'circle';
    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = true;
    }

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
    this.baseChartSpec.mark = { type: useShape, filled: true };
    this.baseChartSpec.config.legend.symbolType = useShape;
    this.baseChartSpec.encoding.shape = {
      field: colorFieldName,
      type: 'nominal'
    };
    this.baseChartSpec.encoding.tooltip = [
      { field: xFieldName, type: 'nominal', title: xAxisTitle },
      { field: yFieldName, type: 'quantitative', title: yAxisTitle },
      { field: colorFieldName, type: 'nominal', title: legendTitle }
    ];

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
