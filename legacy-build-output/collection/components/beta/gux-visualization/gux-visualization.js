/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { h } from '@stencil/core';
import embed from 'vega-embed';
import { getDesiredLocale } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import { timeFormatLocale } from './gux-visualization.locale';
export class GuxVisualization {
  constructor() {
    this.defaultVisualizationSpec = {};
    this.defaultEmbedOptions = {
      actions: false,
      renderer: 'svg'
    };
    this.visualizationSpec = undefined;
    this.embedOptions = undefined;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  handleChartClick(_name, value) {
    this.chartClicked.emit(value);
  }
  async componentDidRender() {
    const locale = getDesiredLocale(this.root);
    const patchOption = {
      patch: (visSpec) => {
        if (!(visSpec === null || visSpec === void 0 ? void 0 : visSpec.signals)) {
          visSpec.signals = [];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        visSpec.signals.push({
          name: 'chartClick',
          value: 0,
          on: [{ events: 'rect:mousedown', update: 'datum' }]
        });
        return visSpec;
      }
    };
    await embed(this.chartContainer, Object.assign({}, this.defaultVisualizationSpec, this.visualizationSpec), Object.assign({
      timeFormatLocale: timeFormatLocale[locale]
    }, this.defaultEmbedOptions, this.embedOptions, patchOption)).then(result => {
      result.view.addSignalListener('chartClick', (name, value) => this.handleChartClick(name, value));
    });
  }
  componentDidLoad() {
    this.chartComponentReady.emit();
  }
  render() {
    return (h("div", { ref: el => (this.chartContainer = el) }));
  }
  static get is() { return "gux-visualization-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-visualization.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-visualization.css"]
    };
  }
  static get properties() {
    return {
      "visualizationSpec": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "VisualizationSpec",
          "resolved": "GenericConcatSpec<NonNormalizedSpec> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | GenericFacetSpec<UnitSpecWithFrame<Field>, LayerSpec<Field>, Field> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } & DataMixins | GenericHConcatSpec<NonNormalizedSpec> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | GenericUnitSpec<FacetedCompositeEncoding<Field>, AnyMark, TopLevelParameter> & ResolveMixins & GenericCompositionLayout & FrameMixins<ExprRef | SignalRef> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } & DataMixins | GenericVConcatSpec<NonNormalizedSpec> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | LayerRepeatSpec & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | LayerSpec<Field> & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | NonLayerRepeatSpec & TopLevelProperties<ExprRef | SignalRef> & { $schema?: string; config?: Config<ExprRef | SignalRef>; datasets?: Datasets; usermeta?: Dict<unknown>; } | Spec",
          "references": {
            "VisualizationSpec": {
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
  static get events() {
    return [{
        "method": "chartComponentReady",
        "name": "chartComponentReady",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "chartClicked",
        "name": "chartClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
}
