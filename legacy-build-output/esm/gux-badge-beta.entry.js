import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const neutral = "badge with label: {label}, color: neutral";
const green = "badge with label: {label}, color: green";
const yellow = "badge with label: {label}, color: yellow";
const red = "badge with label: {label}, color: red";
const inherit = "badge with label: {label}";
const translationResources = {
	neutral: neutral,
	"neutral-bold": "badge with label: {label}, color: neutral bold",
	green: green,
	"green-bold": "badge with label: {label}, color: green bold",
	yellow: yellow,
	"yellow-bold": "badge with label: {label}, color: yellow bold",
	red: red,
	"red-bold": "badge with label: {label}, color: red bold",
	inherit: inherit
};

const guxBadgeCss = ":host{display:inline-block;height:fit-content;border-radius:100%}.gux-badge{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:20px;padding:2px 8px;color:#fdfdfd;background-color:#2e394c;border-radius:4px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-badge gux-tooltip-title{white-space:nowrap}.gux-badge gux-tooltip-title ::slotted(gux-icon){height:16px;font-size:16px}.gux-badge .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-badge.gux-neutral{color:#2e394c;background-color:#e2e6ee}.gux-badge.gux-neutral.gux-bold{color:#fdfdfd;background-color:#2e394c}.gux-badge.gux-red{color:#8f0707;background-color:#fceaea}.gux-badge.gux-red.gux-bold{color:#fdfdfd;background-color:#ea0b0b}.gux-badge.gux-yellow{color:#976700;background-color:#fdf8ec}.gux-badge.gux-yellow.gux-bold{color:#2e394c;background-color:#ffae00}.gux-badge.gux-green{color:#205a10;background-color:#eefcea}.gux-badge.gux-green.gux-bold{color:#fdfdfd;background-color:#3c8527}.gux-badge.gux-inherit{color:inherit;background-color:inherit}";

const GuxBadge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.color = 'neutral';
    this.bold = false;
    this.label = undefined;
  }
  onSlotChange(event) {
    const slotAssignedNodes = event.composedPath()[0].assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }
  renderBadgeTitle() {
    return (h("gux-tooltip-title", null, h("span", null, h("slot", { "aria-hidden": "true", onSlotchange: this.onSlotChange.bind(this) }))));
  }
  renderSrText() {
    return (h("div", { class: "gux-sr-only" }, this.i18n(this.getVariant(), {
      label: this.label
    })));
  }
  getVariant() {
    return `${this.color}${this.bold ? '-bold' : ''}`;
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-badge': true,
        [`gux-${this.color}`]: true,
        'gux-bold': this.bold
      } }, this.renderBadgeTitle(), this.renderSrText()));
  }
  get root() { return getElement(this); }
};
GuxBadge.style = guxBadgeCss;

export { GuxBadge as gux_badge_beta };
