/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
import { logError } from '../../../utils/error/log-error';
const DEFAULT_COLOR_FIELD_NAME = 'category';
export class GuxLineChart {
  constructor() {
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
  static get is() { return "gux-chart-line-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-chart-line.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-chart-line.css"]
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
      "includeDataPointMarkers": {
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
        "attribute": "include-data-point-markers",
        "reflect": false
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
          "text": ""
        },
        "attribute": "color-field-name",
        "reflect": false
      },
      "strokeDash": {
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
        "attribute": "stroke-dash",
        "reflect": false
      },
      "interpolation": {
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
          "text": ""
        },
        "attribute": "interpolation",
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
