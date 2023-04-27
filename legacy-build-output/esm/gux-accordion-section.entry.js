import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { l as logError } from './log-error-3d08c2b1.js';

const guxAccordionSectionCss = ":host{color:#2e394c;-webkit-user-select:none;user-select:none;background-color:#fdfdfd}:host:first-child .gux-header{border-top:1px solid #e2e6ee}section.gux-disabled{cursor:default;opacity:0.5}section.gux-disabled>*{pointer-events:none}.gux-header{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:center;align-items:center;justify-content:flex-start;width:100%;padding:12px 12px 12px 16px;margin:0;cursor:pointer;border-bottom:1px solid #e2e6ee}.gux-header .gux-header-text{flex:1 1 auto;align-self:auto;padding-right:8px;text-align:left}.gux-header .gux-header-text.gux-arrow-position-beside{flex-grow:0}.gux-header.gux-reverse-headings .gux-header-text{display:flex;flex-direction:column-reverse}.gux-header ::slotted([slot='header']){padding:0;margin:0;font-size:12px !important;font-weight:bold !important;line-height:16px !important}.gux-header ::slotted([slot='subheader']){padding:0;margin:2px 0 0;font-size:11px !important;font-weight:400 !important;color:#4c5667}.gux-reverse-headings.gux-header ::slotted([slot='subheader']){margin:0 0 2px 0}.gux-header ::slotted([slot='icon']){flex:0 0 auto;align-self:flex-start;width:16px;height:16px;margin-right:8px;color:#6b7585}.gux-reverse-headings.gux-header ::slotted([slot='icon']){align-self:flex-end}.gux-header .gux-header-icon{flex:0 1 auto;align-items:center;align-self:auto;margin-left:8px;color:#6b7585;transition:transform 0.5s ease;transform-origin:center}.gux-header .gux-header-icon gux-icon{width:16px;height:16px}.gux-header .gux-header-icon.gux-arrow-position-before-text{order:-1;margin:0 8px 0 0}.gux-header .gux-header-icon.gux-expanded{transform:rotate(-180deg)}.gux-header:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-header:focus-visible .gux-header-icon{color:#2e394c}.gux-header:hover .gux-header-icon{color:#2e394c}.gux-content{box-sizing:border-box;display:none;border-bottom:1px solid #e2e6ee}.gux-content.gux-expanded{display:block}.gux-content.gux-text-content-layout{padding:16px}";

const GuxAccordionSection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalsectionopened = createEvent(this, "internalsectionopened", 7);
    this.sectionId = randomHTMLId('gux-accordion-section');
    this.arrowPosition = 'default';
    this.contentLayout = 'text';
    this.open = false;
    this.disabled = false;
    this.reverseHeadings = false;
  }
  watchOpen(open) {
    if (open) {
      this.internalsectionopened.emit();
    }
  }
  toggle() {
    this.open = !this.open;
  }
  isArrowPositionBeforeText() {
    return this.arrowPosition === 'before-text';
  }
  // arrow position 'beside-text' will be removed in v4 (COMUI-1128)
  isArrowPositionedBesideText() {
    return this.arrowPosition === 'beside-text';
  }
  handleSlotChange(slotname) {
    const slot = this.root.querySelector(`[slot="${slotname}"]`);
    if (!slot || !/^H[1-6]$/.test(slot.nodeName)) {
      logError('gux-accordion-section', `For accessibility reasons the ${slotname} slot should be filled with a HTML heading tag (h1 - h6).`);
    }
  }
  componentWillLoad() {
    this.hasIconSlot = !!this.root.querySelector('[slot="icon"]');
  }
  render() {
    return (h("section", { class: { 'gux-disabled': this.disabled } }, h("button", { class: {
        'gux-header': true,
        'gux-reverse-headings': this.reverseHeadings
      }, "aria-expanded": this.open.toString(), "aria-controls": this.sectionId, disabled: this.disabled, onClick: this.toggle.bind(this) }, this.hasIconSlot && h("slot", { name: "icon" }), h("div", { class: {
        'gux-header-text': true,
        'gux-arrow-position-beside': this.isArrowPositionedBesideText()
      } }, h("slot", { onSlotchange: () => this.handleSlotChange('header'), name: "header" }), h("slot", { onSlotchange: () => this.handleSlotChange('subheader'), name: "subheader" })), h("div", { class: {
        'gux-header-icon': true,
        'gux-expanded': this.open,
        'gux-arrow-position-before-text': this.isArrowPositionBeforeText()
      } }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" }))), h("div", { id: this.sectionId, class: {
        'gux-content': true,
        'gux-expanded': this.open,
        'gux-text-content-layout': this.contentLayout === 'text'
      } }, h("slot", { name: "content" }))));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "open": ["watchOpen"]
  }; }
};
GuxAccordionSection.style = guxAccordionSectionCss;

export { GuxAccordionSection as gux_accordion_section };
