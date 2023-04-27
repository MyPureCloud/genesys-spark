import { h } from '@stencil/core';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
/**
 * @slot panel-content - Slot for content of panel
 */
export class GuxDisclosureButton {
  constructor() {
    this.panelId = randomHTMLId('gux-disclosure-button-panel');
    this.position = 'left';
    this.label = undefined;
    this.isOpen = false;
    this.icon = 'arrow-solid-right';
  }
  watchIsOpen() {
    this.updateIcon();
  }
  changeState() {
    this.togglePanel();
    this.active.emit(this.isOpen);
  }
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
  updateIcon() {
    if (this.position === 'right') {
      this.icon = this.isOpen ? 'arrow-solid-right' : 'arrow-solid-left';
    }
    else {
      this.icon = this.isOpen ? 'arrow-solid-left' : 'arrow-solid-right';
    }
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.updateIcon();
  }
  render() {
    return (h("div", { class: `gux-disclosure-button-container gux-${this.position}` }, h("button", { class: "gux-disclosure-button", onClick: () => this.changeState(), "aria-controls": this.panelId, "aria-expanded": this.isOpen.toString(), "aria-label": this.label || this.i18n('defaultLabel') }, h("gux-icon", { "icon-name": `${this.icon}`, decorative: true })), h("div", { id: this.panelId, class: {
        'gux-disclosure-panel': true,
        'gux-active': this.isOpen
      }, role: "region" }, h("slot", { name: "panel-content" }))));
  }
  static get is() { return "gux-disclosure-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-disclosure-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-disclosure-button.css"]
    };
  }
  static get properties() {
    return {
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxDisclosureButtonPosition",
          "resolved": "\"left\" | \"right\"",
          "references": {
            "GuxDisclosureButtonPosition": {
              "location": "import",
              "path": "./gux-disclosure-button.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the position of the button panel"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "'left'"
      },
      "label": {
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
          "text": "Indicates the label for the disclosure button"
        },
        "attribute": "label",
        "reflect": false
      },
      "isOpen": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to open or close the disclosure panel"
        },
        "attribute": "is-open",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "icon": {}
    };
  }
  static get events() {
    return [{
        "method": "active",
        "name": "active",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "return",
              "text": "the panel state"
            }],
          "text": "Return the state of the components panel on state change"
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "isOpen",
        "methodName": "watchIsOpen"
      }];
  }
}
