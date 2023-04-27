/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logError } from '../../../utils/error/log-error';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
const DEFAULT_COLOR_FIELD_NAME = 'category';
const DEFAULT_LABEL_FIELD_NAME = 'value';
const DEFAULT_RING_WIDTH = 32;
export class GuxDonutChart {
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
      logError('gux-chart-donut', '[gux-chart-donut] requires at least one of outer-radius or inner-radius');
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
    trackComponent(this.root);
    this.parseData();
  }
  render() {
    return (h("gux-visualization-beta", { visualizationSpec: this.visualizationSpec, embedOptions: this.tooltipSpec }));
  }
  static get is() { return "gux-chart-donut-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-chart-donut.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-chart-donut.css"]
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
      "innerRadius": {
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
        "attribute": "inner-radius",
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
      "gauge": {
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
        "attribute": "gauge",
        "reflect": false
      },
      "centerText": {
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
        "attribute": "center-text",
        "reflect": false
      },
      "centerSubText": {
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
        "attribute": "center-sub-text",
        "reflect": false
      },
      "showTooltip": {
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
        "attribute": "show-tooltip",
        "reflect": false,
        "defaultValue": "true"
      },
      "tooltipOptions": {
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
      },
      "legendX": {
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
        "attribute": "legend-x",
        "reflect": false
      },
      "legendY": {
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
        "attribute": "legend-y",
        "reflect": false
      },
      "legendFontSize": {
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
        "attribute": "legend-font-size",
        "reflect": false
      },
      "legendSymbolSize": {
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
        "attribute": "legend-symbol-size",
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
