import { h } from '@stencil/core';
import { capitalizeFirstLetter } from '@utils/string/capitalize-first-letter';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../../i18n';
import translationResources from './i18n/en.json';
export class GuxTableToolbarAction {
  constructor() {
    this.action = undefined;
    this.accent = 'secondary';
    this.iconOnly = false;
    this.disabled = false;
  }
  returnActionLocale(action) {
    return this.i18n(`action${capitalizeFirstLetter(action)}`);
  }
  returnActionTypeIcon(action) {
    return action == 'revert' ? 'reset' : action;
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("gux-table-toolbar-custom-action", { "icon-only": this.iconOnly, accent: this.accent, disabled: this.disabled }, h("span", { slot: "text" }, this.returnActionLocale(this.action)), h("gux-icon", { slot: "icon", "icon-name": this.returnActionTypeIcon(this.action), decorative: true })));
  }
  static get is() { return "gux-table-toolbar-action"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "action": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTableToolbarActionTypes",
          "resolved": "\"add\" | \"delete\" | \"export\" | \"import\" | \"refresh\" | \"revert\"",
          "references": {
            "GuxTableToolbarActionTypes": {
              "location": "import",
              "path": "./gux-table-toolbar-action.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "action",
        "reflect": false
      },
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTableToolbarActionAccent",
          "resolved": "\"ghost\" | \"primary\" | \"secondary\"",
          "references": {
            "GuxTableToolbarActionAccent": {
              "location": "import",
              "path": "../gux-table-toolbar-action-accents.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'secondary'"
      },
      "iconOnly": {
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
        "attribute": "icon-only",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "root"; }
}
