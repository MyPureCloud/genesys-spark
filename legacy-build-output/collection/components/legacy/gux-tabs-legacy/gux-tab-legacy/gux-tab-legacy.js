import { h, writeTask } from '@stencil/core';
import { eventIsFrom } from '../../../../utils/dom/event-is-from';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
export class GuxTabLegacy {
  constructor() {
    this.dropdownOptionsButtonId = randomHTMLId();
    this.tabId = undefined;
    this.active = false;
    this.tabIconName = undefined;
    this.popoverHidden = true;
    this.hasAnimated = false;
  }
  get hasDropdownOptions() {
    return Boolean(this.root.querySelector('[slot="dropdown-options"]'));
  }
  toggleOptions() {
    this.popoverHidden = !this.popoverHidden;
  }
  onSelectDropdownOption(e) {
    this.popoverHidden = true;
    e.stopPropagation();
  }
  selectTab(e) {
    if (eventIsFrom('.gux-tab-options-button', e)) {
      return;
    }
    this.popoverHidden = true;
    this.internaltabselected.emit();
  }
  popoverOnClick(e) {
    e.stopPropagation();
  }
  getDropdownOptions() {
    if (this.hasDropdownOptions) {
      return [
        h("button", { id: this.dropdownOptionsButtonId, type: "button", class: "gux-tab-options-button", onClick: () => this.toggleOptions() }, h("gux-icon", { "icon-name": "menu-kebab-vertical", decorative: true })),
        h("gux-popover-list", { position: "top-end", for: this.dropdownOptionsButtonId, displayDismissButton: false, hidden: this.popoverHidden, closeOnClickOutside: true, onGuxdismiss: () => (this.popoverHidden = true), onClick: (e) => this.popoverOnClick(e) }, h("div", { onClick: (e) => this.onSelectDropdownOption(e) }, h("slot", { name: "dropdown-options" })))
      ];
    }
    return null;
  }
  componentDidLoad() {
    if (!this.hasAnimated) {
      writeTask(() => {
        this.root.querySelector('.gux-tab').classList.add('gux-show');
        this.hasAnimated = true;
      });
    }
  }
  render() {
    return (h("button", { type: "button", class: `gux-tab ${this.active ? 'selected' : ''}`, onClick: e => this.selectTab(e), role: "button" }, this.tabIconName ? (h("div", { class: "tab-icon-container" }, h("gux-icon", { "icon-name": this.tabIconName, decorative: true }))) : null, h("span", { class: "tab-title" }, h("slot", { name: "title" })), this.getDropdownOptions()));
  }
  static get is() { return "gux-tab-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab-legacy.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab-legacy.css"]
    };
  }
  static get properties() {
    return {
      "tabId": {
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
          "text": "unique id for the tab"
        },
        "attribute": "tab-id",
        "reflect": false
      },
      "active": {
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
          "text": "indicates whether or not the tab is selected"
        },
        "attribute": "active",
        "reflect": false,
        "defaultValue": "false"
      },
      "tabIconName": {
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
          "text": "indicates the gux-icon to display on the left side of the tab (similar to a favicon in the browser)"
        },
        "attribute": "tab-icon-name",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "popoverHidden": {},
      "hasAnimated": {}
    };
  }
  static get events() {
    return [{
        "method": "internaltabselected",
        "name": "internaltabselected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
}
