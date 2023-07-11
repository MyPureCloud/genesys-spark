/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '@utils/tracking/usage';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
import { logError } from '../../../utils/error/log-error';

@Component({
  styleUrl: 'gux-chart-column.less',
  tag: 'gux-chart-column-beta',
  shadow: true
})
export class GuxColumnChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private baseChartSpec: Record<string, any> = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    mark: { type: 'bar' },
    config: {
      axis: {
        ticks: false,
        titlePadding: 8
      },
      axisX: {
        labelAngle: 0
      },
      scale: {
        bandPaddingInner: 0.4, // padding between columns / bars
        bandPaddingOuter: 0.4 // padding between leftmost/rightmost column/bar from axes
      },
      legend: {
        symbolType: 'circle'
      },
      bar: {
        color: VISUALIZATION_COLORS[0]
      }
    },
    encoding: {
      x: { type: 'nominal' },
      y: { type: 'quantitative' },
      tooltip: { aggregate: 'count', type: 'quantitative' }
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

  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. xFieldName of "category" will map any "category" fields in chartData to the x-axis
   */
  @Prop()
  xFieldName: string;

  /**
   * Name for the data field to use to populate the chart's x-axis
   * e.g. yFieldName of "value" will map any "value" fields in chartData to the y-axis
   */
  @Prop()
  yFieldName: string;

  /**
   * Title to display along the x-axis
   */
  @Prop()
  xAxisTitle: string;

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
   * List specifying the order of optional chart layers.
   * For correct chart layering, each chartData entry must also include a "series" field with a value indicating which layer the entry belongs to, e.g 'series': 'group1'
   */
  @Prop()
  chartLayers: string[];

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
      this.baseChartSpec.config.axisX.labelAngle = 45;
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color = { field: 'category' };
    }

    if (this.legendPosition) {
      this.baseChartSpec.config.legend.orient = this.legendPosition;
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
