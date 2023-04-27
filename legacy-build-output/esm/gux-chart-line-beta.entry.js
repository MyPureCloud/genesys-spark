import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { V as VISUALIZATION_COLORS } from './color-palette-1cfb5585.js';
import { l as logError } from './log-error-3d08c2b1.js';

const guxChartLineCss = "gux-visualization-beta{height:fit-content;color:#2e394c}";

const DEFAULT_COLOR_FIELD_NAME = 'category';
const GuxLineChart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.baseChartSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      mark: {
        type: 'line',
        interpolate: 'linear',
        point: false
      },
      config: {
        axis: {
          ticks: false,
          titlePadding: 8
        },
        axisX: {
          labelAngle: 0
        },
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
    this.chartData = undefined;
    this.xTickLabelSlant = undefined;
    this.includeLegend = undefined;
    this.legendPosition = 'right';
    this.includeDataPointMarkers = undefined;
    this.xFieldName = undefined;
    this.xAxisTitle = undefined;
    this.yFieldName = undefined;
    this.yAxisTitle = undefined;
    this.legendTitle = undefined;
    this.colorFieldName = undefined;
    this.strokeDash = undefined;
    this.interpolation = undefined;
    this.embedOptions = undefined;
  }
  parseData() {
    if (!this.xFieldName || !this.yFieldName) {
      logError('gux-chart-line', '[gux-chart-line] requires x-field-name and y-field-name');
    }
    let chartData = {};
    if (this.chartData) {
      chartData = { data: this.chartData };
    }
    if (this.xTickLabelSlant) {
      this.baseChartSpec.config.axisX.labelAngle = 45;
    }
    if (this.includeLegend) {
      this.baseChartSpec.encoding.color.legend = true;
    }
    if (this.legendPosition) {
      this.baseChartSpec.config.legend.orient = this.legendPosition;
    }
    const xFieldName = this.xFieldName;
    const xAxisTitle = this.xAxisTitle;
    const yFieldName = this.yFieldName;
    const yAxisTitle = this.yAxisTitle;
    const legendTitle = this.legendTitle;
    const colorFieldName = this.colorFieldName || DEFAULT_COLOR_FIELD_NAME;
    const interpolation = this.interpolation;
    const strokeDash = this.strokeDash;
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
    if (strokeDash) {
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
  componentWillLoad() {
    trackComponent(this.root);
    this.parseData();
  }
  render() {
    return (h("gux-visualization-beta", { visualizationSpec: this.visualizationSpec }));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "chartData": ["parseData"]
  }; }
};
GuxLineChart.style = guxChartLineCss;

export { GuxLineChart as gux_chart_line_beta };
