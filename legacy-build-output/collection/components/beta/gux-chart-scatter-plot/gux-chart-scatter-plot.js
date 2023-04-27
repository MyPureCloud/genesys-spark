/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
import { logError } from '../../../utils/error/log-error';
const DEFAULT_COLOR_FIELD_NAME = 'category';
export class GuxScatterPlotChart {
  constructor() {
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
      logError('gux-chart-scatter-plot', '[gux-chart-scatter-plot] requires x-field-name and y-field-name');
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
    trackComponent(this.root);
    this.parseData();
  }
  render() {
    return (h("gux-visualization-beta", { visualizationSpec: this.visualizationSpec }));
  }
  static get is() { return "gux-chart-scatter-plot-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-chart-scatter-plot.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-chart-scatter-plot.css"]
    };
  }
  static get properties() {
    return {
      "chartData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Data to be rendered in the chart.\nData field names must match the values you set in xFieldName and yFieldName"
        }
      },
      "xTickLabelSlant": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, then make Axis tick label 45 degrees"
        },
        "attribute": "x-tick-label-slant",
        "reflect": false
      },
      "includeLegend": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "include-legend",
        "reflect": false
      },
      "legendPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "| 'left'\n    | 'right'\n    | 'top'\n    | 'bottom'\n    | 'top-left'\n    | 'top-right'\n    | 'bottom-left'\n    | 'bottom-right'\n    | 'none'",
          "resolved": "\"bottom\" | \"bottom-left\" | \"bottom-right\" | \"left\" | \"none\" | \"right\" | \"top\" | \"top-left\" | \"top-right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "legend-position",
        "reflect": false,
        "defaultValue": "'right'"
      },
      "xFieldName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Name for the data field to use to populate the chart's x-axis\ne.g. xFieldName of \"category\" will map any \"category\" fields in chartData to the x-axis"
        },
        "attribute": "x-field-name",
        "reflect": false
      },
      "xAxisTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Title to display along the x-axis"
        },
        "attribute": "x-axis-title",
        "reflect": false
      },
      "yFieldName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Name for the data field to use to populate the chart's x-axis\ne.g. yFieldName of \"value\" will map any \"value\" fields in chartData to the y-axis"
        },
        "attribute": "y-field-name",
        "reflect": false
      },
      "yAxisTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Title to display along the y-axis"
        },
        "attribute": "y-axis-title",
        "reflect": false
      },
      "legendTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Title to display above the optional legend"
        },
        "attribute": "legend-title",
        "reflect": false
      },
      "colorFieldName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Type of category to plot in the chart"
        },
        "attribute": "color-field-name",
        "reflect": false
      },
      "useShape": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The shape of the plotting in the chart - Square, Circle and Point"
        },
        "attribute": "use-shape",
        "reflect": false
      },
      "embedOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "EmbedOptions",
          "resolved": "EmbedOptions<string, Renderers>",
          "references": {
            "EmbedOptions": {
              "location": "import",
              "path": "vega-embed"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "chartData",
        "methodName": "parseData"
      }];
  }
}
