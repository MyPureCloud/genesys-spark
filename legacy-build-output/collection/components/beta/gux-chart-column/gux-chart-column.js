/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { VISUALIZATION_COLORS } from '../../../utils/theme/color-palette';
import { logError } from '../../../utils/error/log-error';
export class GuxColumnChart {
  constructor() {
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
          color: VISUALIZATION_COLORS[0]
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
      logError('gux-chart-column', '[gux-chart-column] requires x-field-name and y-field-name');
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
      [rangeField]: VISUALIZATION_COLORS
    };
    this.baseChartSpec.config.range = rangeConfig;
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
  static get is() { return "gux-chart-column-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-chart-column.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-chart-column.css"]
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
      "chartLayers": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List specifying the order of optional chart layers.\nFor correct chart layering, each chartData entry must also include a \"series\" field with a value indicating which layer the entry belongs to, e.g 'series': 'group1'"
        }
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
