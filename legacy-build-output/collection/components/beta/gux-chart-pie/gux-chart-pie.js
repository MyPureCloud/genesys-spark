/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logError } from '../../../utils/error/log-error';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
export class GuxPieChart {
  constructor() {
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
  static get is() { return "gux-chart-pie-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-chart-pie.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-chart-pie.css"]
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
          "text": ""
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
      "outerRadius": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "outer-radius",
        "reflect": false
      },
      "labelRadius": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-radius",
        "reflect": false
      },
      "labelField": {
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
        "attribute": "label-field",
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
