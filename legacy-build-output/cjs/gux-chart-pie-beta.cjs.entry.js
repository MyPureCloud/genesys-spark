'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const logError = require('./log-error-ddbca3a0.js');
const colorPalette = require('./color-palette-4339407d.js');

const guxChartPieCss = "gux-visualization-beta{height:fit-content;color:#2e394c}";

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
const GuxPieChart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.baseChartSpec = {
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
          scale: { range: colorPalette.VISUALIZATION_COLORS },
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
    this.chartData = undefined;
    this.includeLegend = undefined;
    this.legendPosition = 'right';
    this.legendTitle = undefined;
    this.colorFieldName = undefined;
    this.outerRadius = undefined;
    this.labelRadius = undefined;
    this.labelField = undefined;
    this.embedOptions = undefined;
  }
  parseData() {
    if (!this.outerRadius) {
      logError.logError('gux-chart-pie', '[gux-chart-pie] requires outer-radius');
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
GuxPieChart.style = guxChartPieCss;

exports.gux_chart_pie_beta = GuxPieChart;
