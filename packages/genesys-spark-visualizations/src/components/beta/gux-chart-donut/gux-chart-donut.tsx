/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { trackComponent } from '@utils/tracking/usage';

import { logError } from '../../../utils/error/log-error';

import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
const DEFAULT_RING_WIDTH = 32;

@Component({
  styleUrl: 'gux-chart-donut.less',
  tag: 'gux-chart-donut-beta',
  shadow: true
})
export class GuxDonutChart {
  @Element()
  root: HTMLElement;

  private visualizationSpec: VisualizationSpec;
  private tooltipSpec: EmbedOptions;

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
      }
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
  innerRadius: number;

  @Prop()
  labelRadius: number;

  @Prop()
  labelField: string;

  @Prop()
  gauge: boolean;

  @Prop()
  centerText: string;

  @Prop()
  centerSubText: string;

  @Prop()
  showTooltip: boolean = true;

  @Prop()
  tooltipOptions: EmbedOptions;

  @Prop()
  legendX: number;

  @Prop()
  legendY: number;

  @Prop()
  legendFontSize: number;

  @Prop()
  legendSymbolSize: number;

  @Prop()
  embedOptions: EmbedOptions;

  @Watch('chartData')
  parseData() {
    if (!this.outerRadius && !this.innerRadius) {
      logError(
        this.root,
        'requires at least one of outer-radius or inner-radius'
      );
    }

    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }

    if (this.legendPosition) {
      this.baseChartSpec.config.legend.orient = this.legendPosition;
    }

    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = {};

      if (this.legendX || this.legendY) {
        this.baseChartSpec.config.legend.orient = 'none';
        if (this.legendX) {
          this.baseChartSpec.encoding.color.legend.legendX = this.legendX;
        }
        if (this.legendY) {
          this.baseChartSpec.encoding.color.legend.legendY = this.legendY;
        }
      }
      if (this.legendFontSize) {
        this.baseChartSpec.encoding.color.legend.labelFontSize =
          this.legendFontSize;
      }
      if (this.legendSymbolSize) {
        this.baseChartSpec.encoding.color.legend.symbolSize =
          this.legendSymbolSize;
      }
    } else {
      this.baseChartSpec.encoding.color.legend = null;
    }

    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;

    if (colorFieldName) {
      this.baseChartSpec.encoding.color.field = colorFieldName;
    }

    const legendTitle = this.legendTitle;
    if (legendTitle) {
      this.baseChartSpec.encoding.color.title = legendTitle;
    } else {
      this.baseChartSpec.encoding.color.title = '';
    }

    let outerRadius = this.outerRadius;
    let innerRadius = this.innerRadius;

    if (!outerRadius) {
      outerRadius = innerRadius + DEFAULT_RING_WIDTH;
    }
    if (!innerRadius) {
      innerRadius = outerRadius - DEFAULT_RING_WIDTH;
    }

    let layerFiels = 1;

    if (this.gauge) {
      this.baseChartSpec.layer = [
        {
          data: { values: [{ progress: 'default', value: 100 }] },
          mark: { type: 'arc', innerRadius },
          encoding: {
            theta: { field: 'value', type: 'quantitative' },
            color: { value: '#E4E9F0' },
            tooltip: null
          }
        },
        {
          mark: { type: 'arc', outerRadius, innerRadius, padAngle: 0.01 }
        },
        {
          mark: { type: 'arc', innerRadius, padAngle: 0.01 }
        }
      ];
      layerFiels = 2;
    } else {
      this.baseChartSpec.layer = [
        {
          mark: { type: 'arc', outerRadius, innerRadius }
        },
        {
          mark: { type: 'arc', innerRadius, stroke: '#fff' }
        }
      ];
    }

    const centerText = this.centerText;
    if (centerText) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.baseChartSpec.layer.push({
        data: { values: [{ centerText: centerText, value: 0 }] },
        mark: { align: 'center', type: 'text', baseline: 'middle' },
        encoding: {
          color: { value: '#4C5054' },
          text: { field: 'centerText' },
          size: { value: { expr: 'height * 0.09' } },
          tooltip: null
        }
      });
    }

    const centerSubText = this.centerSubText;
    if (centerSubText) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.baseChartSpec.layer.push({
        data: { values: [{ centerSubText: centerSubText, value: 0 }] },
        mark: {
          align: 'center',
          type: 'text',
          baseline: 'middle',
          y: { expr: 'height/2 + 20' }
        },
        encoding: {
          color: { value: '#6A6D70' },
          text: { field: 'centerSubText' },
          size: { value: { expr: 'height * 0.06' } },
          tooltip: null
        }
      });
    }

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

    if (this.showTooltip) {
      if (this.tooltipOptions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.baseChartSpec.layer[layerFiels].mark.tooltip = { content: 'data' };
        this.tooltipSpec = {
          actions: false,
          tooltip: this.tooltipOptions
        };
      } else {
        this.baseChartSpec.encoding.tooltip = {
          field: labelField,
          aggregate: 'count',
          type: 'quantitative'
        };
      }
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
        embedOptions={this.tooltipSpec}
      ></gux-visualization-beta>
    ) as JSX.Element;
  }
}
