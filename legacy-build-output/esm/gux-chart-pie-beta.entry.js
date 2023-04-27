import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { l as logError } from './log-error-3d08c2b1.js';
import { V as VISUALIZATION_COLORS } from './color-palette-1cfb5585.js';

const guxChartPieCss = "gux-visualization-beta{height:fit-content;color:#2e394c}";

const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
const GuxPieChart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
          scale: { range: VISUALIZATION_COLORS },
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
      logError('gux-chart-pie', '[gux-chart-pie] requires outer-radius');
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
GuxPieChart.style = guxChartPieCss;

export { GuxPieChart as gux_chart_pie_beta };
