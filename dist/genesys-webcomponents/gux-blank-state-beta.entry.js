import { r as registerInstance, k as readTask, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { O as OnResize } from './on-resize-e61702f7.js';

/**
 * Below are the max-widths for the blank state component.
 */
const SMALL_STATE = 160;
const MEDIUM_STATE = 300;

const guxBlankStateCss = ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container ::slotted(gux-icon){width:48px;height:48px;color:#c8cfda}.gux-container slot[name='primary-message']{color:#364154;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:14px;line-height:20px}.gux-container slot[name='additional-guidance']{color:#364154;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}.gux-container.gux-small .gux-message-container,.gux-container.gux-medium .gux-message-container{padding:8px 0 4px}.gux-container.gux-small .gux-guidance-container,.gux-container.gux-medium .gux-guidance-container{padding-bottom:8px}.gux-container.gux-large .gux-message-container{padding:16px 0 4px}.gux-container.gux-large .gux-message-container slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}.gux-container.gux-large .gux-guidance-container{padding-bottom:16px}.gux-container.gux-large .gux-guidance-container slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxBlankState = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      if (containerWidth <= SMALL_STATE) {
        this.blankStateSize = 'small';
      }
      else if (containerWidth <= MEDIUM_STATE) {
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
  get root() { return getElement(this); }
};
__decorate([
  OnResize()
], GuxBlankState.prototype, "onResize", null);
GuxBlankState.style = guxBlankStateCss;

export { GuxBlankState as gux_blank_state_beta };
