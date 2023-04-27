import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
export class GuxPaginationCursor {
  constructor() {
    this.hasPrevious = false;
    this.hasNext = false;
  }
  onButtonClick(paginationDetail) {
    if ((paginationDetail === 'previous' && this.hasPrevious) ||
      (paginationDetail === 'next' && this.hasNext)) {
      this.guxPaginationCursorchange.emit(paginationDetail);
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return [
      h("gux-button-slot-beta", { accent: "secondary" }, h("button", { type: "button", title: this.i18n('previous'), disabled: !this.hasPrevious, onClick: () => this.onButtonClick('previous') }, h("gux-icon", { decorative: true, iconName: "chevron-small-left" }))),
      h("gux-button-slot-beta", { accent: "secondary" }, h("button", { type: "button", title: this.i18n('next'), disabled: !this.hasNext, onClick: () => this.onButtonClick('next') }, h("gux-icon", { decorative: true, iconName: "chevron-small-right" })))
    ];
  }
  static get is() { return "gux-pagination-cursor"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination-cursor.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination-cursor.css"]
    };
  }
  static get properties() {
    return {
      "hasPrevious": {
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
        "attribute": "has-previous",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasNext": {
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
        "attribute": "has-next",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "guxPaginationCursorchange",
        "name": "guxPaginationCursorchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "GuxPaginationCursorDetail",
          "resolved": "\"next\" | \"previous\"",
          "references": {
            "GuxPaginationCursorDetail": {
              "location": "import",
              "path": "./gux-pagination-cursor.types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "root"; }
}
