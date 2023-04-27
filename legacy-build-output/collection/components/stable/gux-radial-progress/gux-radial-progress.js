import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '../../../utils/error/log-error';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { GuxPercentageState, GuxSpinnerState } from './gux-radial-progress.functional';
import { canShowPercentageState } from './gux-radial-progress.service';
export class GuxRadialProgress {
  constructor() {
    this.dropshadowId = randomHTMLId('gux-dropshadow');
    this.value = undefined;
    this.max = 100;
    this.scale = 0;
    this.screenreaderText = '';
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  componentDidLoad() {
    if (!this.screenreaderText &&
      canShowPercentageState(this.value, this.max)) {
      logWarn('gux-radial-progress', 'No screenreader-text provided. Provide a localized screenreader-text property for the component.');
    }
  }
  render() {
    return canShowPercentageState(this.value, this.max)
      ? (h(GuxPercentageState, { value: this.value, max: this.max, scale: this.scale, dropshadowId: this.dropshadowId, screenreaderText: this.screenreaderText }))
      : (h(GuxSpinnerState, { screenreaderText: this.screenreaderText }));
  }
  static get is() { return "gux-radial-progress"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-radial-progress.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-radial-progress.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
          "text": "The progress made in the progress spinner compared to the max value"
        },
        "attribute": "value",
        "reflect": false
      },
      "max": {
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
          "text": "The max value of the progress spinner"
        },
        "attribute": "max",
        "reflect": false,
        "defaultValue": "100"
      },
      "scale": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "GuxRadialProgressScale",
          "resolved": "0 | 1 | 2",
          "references": {
            "GuxRadialProgressScale": {
              "location": "import",
              "path": "./gux-radial-progress.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max number of decimal places that will be displayed"
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "0"
      },
      "screenreaderText": {
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
          "text": "Required localized text to provide an accessible label for the component"
        },
        "attribute": "screenreader-text",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get elementRef() { return "root"; }
}
