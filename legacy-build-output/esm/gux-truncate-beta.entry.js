import { r as registerInstance, f as forceUpdate, h, g as getElement } from './index-816e34d8.js';
import { O as OnMutation } from './on-mutation-35d8145e.js';
import { O as OnResize } from './on-resize-3784d0c6.js';

function getTextContentFromNodes(elements) {
  return elements
    .reduce((acc, cv) => {
    if (cv.nodeName === 'SLOT') {
      const slotElements = cv.assignedNodes();
      return acc.concat(getTextContentFromNodes(slotElements));
    }
    return acc.concat(cv.textContent);
  }, [])
    .map(s => s.trim())
    .join(' ');
}

const guxTruncateCss = ":host{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:inherit}::slotted(*){display:inline}.gux-truncate-multi-line{white-space:normal}.gux-truncate-multi-line .gux-truncate-slot-container{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}gux-tooltip{font-weight:normal;line-height:normal;text-align:left;overflow-wrap:break-word;white-space:normal}.gux-truncate-slot-container>*{display:inline}.gux-truncate-slot-container{display:block;overflow:hidden;text-overflow:ellipsis}";

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
const GuxTruncate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.maxLines = undefined;
  }
  async setShowTooltip() {
    var _a;
    await ((_a = this.tooltipElement) === null || _a === void 0 ? void 0 : _a.showTooltip());
  }
  async setHideTooltip() {
    var _a;
    await ((_a = this.tooltipElement) === null || _a === void 0 ? void 0 : _a.hideTooltip());
  }
  onMutation() {
    forceUpdate(this.root);
  }
  onResize() {
    forceUpdate(this.root);
  }
  getTooltipContent() {
    return getTextContentFromNodes(Array.from(this.root.childNodes)) || '';
  }
  needsTruncation() {
    const slotContainerElement = this.root.shadowRoot.querySelector('.gux-truncate-slot-container');
    return ((slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.scrollWidth) > (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.offsetWidth) ||
      (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.scrollHeight) > (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.offsetHeight));
  }
  renderTooltip() {
    if (this.needsTruncation()) {
      return (h("gux-tooltip", { "aria-hidden": "true", ref: el => (this.tooltipElement = el) }, this.getTooltipContent()));
    }
    return null;
  }
  render() {
    var _a;
    return (h("div", { class: {
        'gux-truncate-multi-line': Boolean(this.maxLines)
      } }, h("span", { class: "gux-truncate-slot-container", style: { webkitLineClamp: (_a = this.maxLines) === null || _a === void 0 ? void 0 : _a.toString() } }, h("slot", null)), this.renderTooltip()));
  }
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true, characterData: true })
], GuxTruncate.prototype, "onMutation", null);
__decorate([
  OnResize()
], GuxTruncate.prototype, "onResize", null);
GuxTruncate.style = guxTruncateCss;

export { GuxTruncate as gux_truncate_beta };
