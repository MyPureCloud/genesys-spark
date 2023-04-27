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
import { h, readTask } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { OnResize } from '../../../utils/decorator/on-resize';
import * as blankStateWidth from './gux-blank-state-constants';
/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 */
export class GuxBlankState {
  constructor() {
    this.blankStateSize = undefined;
  }
  onResize() {
    this.setBlankStateSize();
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  componentDidLoad() {
    this.setBlankStateSize();
  }
  setBlankStateSize() {
    readTask(() => {
      const containerWidth = this.root.clientWidth;
      if (containerWidth <= blankStateWidth.SMALL_STATE) {
        this.blankStateSize = 'small';
      }
      else if (containerWidth <= blankStateWidth.MEDIUM_STATE) {
        this.blankStateSize = 'medium';
      }
      else {
        this.blankStateSize = 'large';
      }
    });
  }
  render() {
    return (h("div", { class: {
        'gux-container': true,
        [`gux-${this.blankStateSize}`]: true
      } }, h("slot", { name: "image" }), h("div", { class: "gux-message-container" }, h("slot", { name: "primary-message" })), h("div", { class: "gux-guidance-container" }, h("slot", { name: "additional-guidance" })), h("gux-button-slot-beta", { accent: "primary" }, h("slot", { name: "call-to-action" }))));
  }
  static get is() { return "gux-blank-state-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-blank-state.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-blank-state.css"]
    };
  }
  static get states() {
    return {
      "blankStateSize": {}
    };
  }
  static get elementRef() { return "root"; }
}
__decorate([
  OnResize()
], GuxBlankState.prototype, "onResize", null);
