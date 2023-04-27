'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const colorPalette = require('./color-palette-4339407d.js');
const logError = require('./log-error-ddbca3a0.js');

const guxChartScatterPlotCss = "gux-visualization-beta{height:fit-content;color:#2e394c}";

const DEFAULT_COLOR_FIELD_NAME = 'category';
const GuxScatterPlotChart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.baseChartSpec = {
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
          scale: { range: colorPalette.VISUALIZATION_COLORS },
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
    this.chartData = undefined;
    this.xTickLabelSlant = undefined;
    this.includeLegend = undefined;
    this.legendPosition = 'right';
    this.xFieldName = undefined;
    this.xAxisTitle = undefined;
    this.yFieldName = undefined;
    this.yAxisTitle = undefined;
    this.legendTitle = undefined;
    this.colorFieldName = undefined;
    this.useShape = undefined;
    this.embedOptions = undefined;
  }
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      logError.logError('gux-chart-scatter-plot', '[gux-chart-scatter-plot] requires x-field-name and y-field-name');
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
  componentWillLoad() {
    usage.trackComponent(this.root);
    this.parseData();
  }
  render() {
    return (index.h("gux-visualization-beta", { visualizationSpec: this.visualizationSpec }));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "chartData": ["parseData"]
  }; }
};
GuxScatterPlotChart.style = guxChartScatterPlotCss;

exports.gux_chart_scatter_plot_beta = GuxScatterPlotChart;
