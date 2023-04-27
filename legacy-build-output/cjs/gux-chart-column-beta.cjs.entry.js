'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const colorPalette = require('./color-palette-4339407d.js');
const logError = require('./log-error-ddbca3a0.js');

const guxChartColumnCss = "gux-visualization-beta{height:fit-content;color:#2e394c;}gux-visualization-beta .mark-rect.layer_0_marks path{fill:url(#diagonalHatch0)}gux-visualization-beta .mark-rect.layer_1_marks path{fill:#1da8b3}";

const GuxColumnChart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.baseChartSpec = {
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
          bandPaddingInner: 0.4,
          bandPaddingOuter: 0.4 // padding between leftmost/rightmost column/bar from axes
        },
        legend: {
          symbolType: 'circle'
        },
        bar: {
          color: colorPalette.VISUALIZATION_COLORS[0]
        }
      },
      encoding: {
        x: { type: 'nominal' },
        y: { type: 'quantitative' },
        tooltip: { aggregate: 'count', type: 'quantitative' }
      }
    };
    this.chartData = undefined;
    this.xTickLabelSlant = undefined;
    this.includeLegend = undefined;
    this.xFieldName = undefined;
    this.yFieldName = undefined;
    this.xAxisTitle = undefined;
    this.yAxisTitle = undefined;
    this.legendTitle = undefined;
    this.legendPosition = 'right';
    this.chartLayers = undefined;
    this.embedOptions = undefined;
  }
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      logError.logError('gux-chart-column', '[gux-chart-column] requires x-field-name and y-field-name');
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
    }
    else {
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
      [rangeField]: colorPalette.VISUALIZATION_COLORS
    };
    this.baseChartSpec.config.range = rangeConfig;
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
GuxColumnChart.style = guxChartColumnCss;

exports.gux_chart_column_beta = GuxColumnChart;
