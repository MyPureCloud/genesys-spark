var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { OnClickOutside } from '../../../../utils/decorator/on-click-outside';
import { buildI18nForComponent } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { afterNextRender } from '../../../../utils/dom/after-next-render';
export class GuxTableToolbarMenuButton {
  constructor() {
    this.showMenu = undefined;
    this.expanded = false;
  }
  handleKeyDown(event) {
    const composedPath = event.composedPath();
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        if (composedPath.includes(this.listElement)) {
          event.preventDefault();
          this.dropdownButton.focus();
        }
        break;
      case 'Tab': {
        this.expanded = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.dropdownButton)) {
          event.preventDefault();
          this.expanded = true;
          this.focusFirstItemInPopupList();
        }
        break;
    }
  }
  handleKeyup(event) {
    switch (event.key) {
      case ' ': {
        const composedPath = event.composedPath();
        if (composedPath.includes(this.dropdownButton)) {
          this.expanded = true;
          this.focusFirstItemInPopupList();
        }
        break;
      }
    }
  }
  toggle() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusPopupList();
    }
  }
  onClickOutside() {
    this.expanded = false;
  }
  focusPopupList() {
    afterNextRender(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    trackComponent(this.root);
  }
  render() {
    return (h(Host, { class: { 'gux-show-menu': this.showMenu } }, h("gux-popup-beta", { expanded: this.expanded }, h("div", { slot: "target", class: "gux-toolbar-menu-container" }, h("gux-button-slot-beta", { class: "gux-menu-button" }, h("button", { type: "button", ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.expanded.toString() }, h("gux-icon", { "screenreader-text": this.i18n('additionalActions'), "icon-name": "menu-kebab-horizontal" })))), h("div", { class: "gux-list-container", slot: "popup" }, h("gux-list", { ref: el => (this.listElement = el) }, h("slot", null))))));
  }
  static get is() { return "gux-table-toolbar-menu-button"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-table-toolbar-menu-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-table-toolbar-menu-button.css"]
    };
  }
  static get properties() {
    return {
      "showMenu": {
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
        "attribute": "show-menu",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "expanded": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "handleKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxTableToolbarMenuButton.prototype, "onClickOutside", null);
