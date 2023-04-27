'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const logError = require('./log-error-ddbca3a0.js');
const colorPalette = require('./color-palette-4339407d.js');

const guxChartDonutCss = "gux-visualization-beta{height:fit-content;color:#2e394c}";

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
const DEFAULT_RING_WIDTH = 32;
const GuxDonutChart = class {
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
    this.chartData = undefined;
    this.includeLegend = undefined;
    this.legendPosition = 'right';
    this.legendTitle = undefined;
    this.colorFieldName = undefined;
    this.outerRadius = undefined;
    this.innerRadius = undefined;
    this.labelRadius = undefined;
    this.labelField = undefined;
    this.gauge = undefined;
    this.centerText = undefined;
    this.centerSubText = undefined;
    this.showTooltip = true;
    this.tooltipOptions = undefined;
    this.legendX = undefined;
    this.legendY = undefined;
    this.legendFontSize = undefined;
    this.legendSymbolSize = undefined;
    this.embedOptions = undefined;
  }
  parseData() {
    if (!this.outerRadius && !this.innerRadius) {
      logError.logError('gux-chart-donut', '[gux-chart-donut] requires at least one of outer-radius or inner-radius');
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
    }
    else {
      this.baseChartSpec.encoding.color.legend = null;
    }
    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;
    if (colorFieldName) {
      this.baseChartSpec.encoding.color.field = colorFieldName;
    }
    const legendTitle = this.legendTitle;
    if (legendTitle) {
      this.baseChartSpec.encoding.color.title = legendTitle;
    }
    else {
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
    }
    else {
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
      }
      else {
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
  componentWillLoad() {
    usage.trackComponent(this.root);
    this.parseData();
  }
  render() {
    return (index.h("gux-visualization-beta", { visualizationSpec: this.visualizationSpec, embedOptions: this.tooltipSpec }));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "chartData": ["parseData"]
  }; }
};
GuxDonutChart.style = guxChartDonutCss;

exports.gux_chart_donut_beta = GuxDonutChart;
