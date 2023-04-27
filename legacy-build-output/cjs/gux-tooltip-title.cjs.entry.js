'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const logError = require('./log-error-ddbca3a0.js');
const onMutation = require('./on-mutation-83dff2a7.js');

const guxTooltipTitleCss = "gux-tooltip-title{overflow:hidden}gux-tooltip{font-weight:normal;line-height:normal;text-align:left;overflow-wrap:break-word;white-space:normal}.gux-overflow-hidden .gux-title-container ::slotted(span){overflow:hidden;text-overflow:ellipsis}.gux-overflow-hidden .gux-title-container>*{overflow:hidden;text-overflow:ellipsis}.gux-title-container{display:flex;pointer-events:none}.gux-tooltip-icon-decorative .gux-title-container{position:relative;margin-left:calc(16px + 4px)}.gux-tooltip-icon-decorative .gux-title-container gux-icon,.gux-tooltip-icon-decorative .gux-title-container ::slotted(gux-icon){position:absolute;left:calc(-16px - 4px);flex-shrink:0;width:16px}";

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
const GuxTooltipTitle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hasTooltip = false;
    this.showTooltip = false;
    this.iconOnly = false;
    this.titleName = '';
  }
  onmouseenter(event) {
    if (!event.buttons) {
      this.showTooltip = true;
    }
  }
  onmouseleave() {
    this.showTooltip = false;
  }
  onmousedown() {
    this.showTooltip = false;
  }
  async setShowTooltip() {
    if (this.tooltipElement) {
      this.showTooltip = true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.tooltipElement.showTooltip();
    }
  }
  async setHideTooltip() {
    if (this.tooltipElement) {
      this.showTooltip = false;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await this.tooltipElement.hideTooltip();
    }
  }
  onMutation() {
    this.titleName = this.setTooltipTitleText();
    this.checkForTooltipHideOrShow();
  }
  componentWillLoad() {
    this.titleName = this.setTooltipTitleText();
  }
  componentDidLoad() {
    this.logWarnNoIconSrText();
  }
  logWarnNoIconSrText() {
    if (this.iconOnly && !this.titleName) {
      logError.logWarn('gux-tooltip-title', 'No screenreader-text provided. Provide a localized screenreader-text property for the gux-icon. The screenreader-text property is used for the icon screenreader text and the tooltip.');
    }
  }
  addIconDecorative() {
    this.root.classList.add('gux-tooltip-icon-decorative');
  }
  getTitleElements() {
    var _a;
    const slot = this.root.querySelector('slot');
    const target = (_a = this.root.querySelector('.gux-title-container span')) === null || _a === void 0 ? void 0 : _a.children;
    if (slot) {
      return slot.assignedElements();
    }
    else if (target) {
      return Array.from(target);
    }
    return [];
  }
  getTitleTextContent() {
    if (this.root.querySelector('slot')) {
      return this.root
        .querySelector('slot')
        .assignedNodes()
        .map(node => node.textContent)
        .join('')
        .trim();
    }
    else if (this.root.querySelector('.gux-title-container')) {
      return this.root.querySelector('.gux-title-container').textContent.trim();
    }
    return '';
  }
  setTooltipTitleText() {
    let tooltipTitleText = this.getTitleTextContent();
    this.getTitleElements().forEach(element => {
      if (element.tagName === 'GUX-ICON' && !this.getTitleTextContent()) {
        this.iconOnly = true;
        tooltipTitleText = element.getAttribute('screenreader-text');
      }
      else if (element.tagName === 'GUX-ICON' && this.getTitleTextContent()) {
        this.addIconDecorative();
      }
    });
    return tooltipTitleText;
  }
  checkForTooltipHideOrShow() {
    const titleContainer = this.root.querySelector('.gux-title-container');
    this.root.classList.remove('gux-overflow-hidden');
    if (this.iconOnly && this.titleName) {
      this.hasTooltip = true;
    }
    else if ((titleContainer === null || titleContainer === void 0 ? void 0 : titleContainer.scrollWidth) > (titleContainer === null || titleContainer === void 0 ? void 0 : titleContainer.offsetWidth)) {
      this.root.classList.add('gux-overflow-hidden');
      this.hasTooltip = true;
    }
    else {
      this.hasTooltip = false;
    }
  }
  render() {
    return [
      index.h("span", { class: "gux-title-container" }, index.h("slot", null)),
      this.renderTooltip()
    ];
  }
  renderTooltip() {
    if (this.hasTooltip) {
      return (index.h("gux-tooltip", { "aria-hidden": "true", ref: el => (this.tooltipElement = el), hidden: !this.showTooltip }, this.titleName));
    }
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true, characterData: true })
], GuxTooltipTitle.prototype, "onMutation", null);
GuxTooltipTitle.style = guxTooltipTitleCss;

exports.gux_tooltip_title = GuxTooltipTitle;
