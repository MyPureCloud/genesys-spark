import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '../../../utils/dom/after-next-render';
/**
 * @slot - element
 */
export class GuxAnnounce {
  constructor() {
    this.politeness = 'polite';
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxAnnounce(text) {
    this.containerElement.innerText = '';
    afterNextRender(() => {
      this.containerElement.innerText = text;
    });
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h(Host, { "aria-live": this.politeness }, h("slot", null), h("div", { ref: el => (this.containerElement = el) })));
  }
  static get is() { return "gux-announce-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-announce.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-announce.css"]
    };
  }
  static get properties() {
    return {
      "politeness": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxAnnouncePoliteness",
          "resolved": "\"assertive\" | \"off\" | \"polite\"",
          "references": {
            "GuxAnnouncePoliteness": {
              "location": "import",
              "path": "./gux-announce.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "politeness",
        "reflect": false,
        "defaultValue": "'polite'"
      }
    };
  }
  static get methods() {
    return {
      "guxAnnounce": {
        "complexType": {
          "signature": "(text: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
}
