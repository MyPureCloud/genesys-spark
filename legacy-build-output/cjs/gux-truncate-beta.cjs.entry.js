'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const onResize = require('./on-resize-f7d98e20.js');

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
    index.registerInstance(this, hostRef);
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
    index.forceUpdate(this.root);
  }
  onResize() {
    index.forceUpdate(this.root);
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
      return (index.h("gux-tooltip", { "aria-hidden": "true", ref: el => (this.tooltipElement = el) }, this.getTooltipContent()));
    }
    return null;
  }
  render() {
    var _a;
    return (index.h("div", { class: {
        'gux-truncate-multi-line': Boolean(this.maxLines)
      } }, index.h("span", { class: "gux-truncate-slot-container", style: { webkitLineClamp: (_a = this.maxLines) === null || _a === void 0 ? void 0 : _a.toString() } }, index.h("slot", null)), this.renderTooltip()));
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true, characterData: true })
], GuxTruncate.prototype, "onMutation", null);
__decorate([
  onResize.OnResize()
], GuxTruncate.prototype, "onResize", null);
GuxTruncate.style = guxTruncateCss;

exports.gux_truncate_beta = GuxTruncate;
