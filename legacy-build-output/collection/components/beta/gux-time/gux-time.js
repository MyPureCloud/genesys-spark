import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { DateTimeFormatter } from '../../../i18n/DateTimeFormatter';
import { getDesiredLocale } from '../../../i18n/index';
export class GuxTime {
  constructor() {
    this.datetime = new Date().toISOString();
    this.format = 'short';
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
  }
  render() {
    return (h(Host, null, this.formatter.formatTime(new Date(this.datetime), this.format)));
  }
  static get is() { return "gux-time-beta"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "datetime": {
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
          "text": "The ISO string representation of the time to format"
        },
        "attribute": "datetime",
        "reflect": false,
        "defaultValue": "new Date().toISOString()"
      },
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxDateTimeFormat",
          "resolved": "\"full\" | \"long\" | \"medium\" | \"short\"",
          "references": {
            "GuxDateTimeFormat": {
              "location": "import",
              "path": "../../../i18n/DateTimeFormatter"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Format option type"
        },
        "attribute": "format",
        "reflect": false,
        "defaultValue": "'short'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
