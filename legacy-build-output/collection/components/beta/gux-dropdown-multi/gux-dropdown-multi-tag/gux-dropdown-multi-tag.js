import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import translationResources from './i18n/en.json';
export class GuxDropdownMultiTag {
  constructor() {
    this.disabled = false;
    this.numberSelected = 0;
    this.label = '';
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }
  removeTag() {
    if (this.disabled) {
      return;
    }
    this.internalclearselected.emit();
  }
  renderRemoveButton() {
    return (h("button", { class: "gux-tag-remove-button", onClick: this.removeTag.bind(this), type: "button", disabled: this.disabled }, h("gux-icon", { class: "gux-tag-remove-icon", "icon-name": "close", "screenreader-text": this.i18n('clearSelection', {
        numberSelected: this.numberSelected.toString()
      }) })));
  }
  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-tag': true,
        'gux-disabled': this.disabled
      }, "aria-disabled": this.disabled.toString() }, this.numberSelected.toString(), this.renderRemoveButton()));
  }
  static get is() { return "gux-dropdown-multi-tag"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-dropdown-multi-tag.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-dropdown-multi-tag.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Tag is removable."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "numberSelected": {
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
        "attribute": "number-selected",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "label": {}
    };
  }
  static get events() {
    return [{
        "method": "internalclearselected",
        "name": "internalclearselected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggered when click on remove button"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
