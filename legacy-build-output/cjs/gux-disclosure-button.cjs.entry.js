'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const defaultLabel = "Disclosure button";
const translationResources = {
	defaultLabel: defaultLabel
};

const guxDisclosureButtonCss = ":host{height:100%;color:#2e394c}.gux-disclosure-button-container{display:flex;flex-direction:row;justify-content:flex-start;height:100%}.gux-disclosure-button-container .gux-disclosure-button{width:16px;padding:0;margin:0;color:#2e394c;background:transparent;border-top:none;border-right:1px solid #e2e6ee;border-bottom:none;border-left:1px solid #e2e6ee}.gux-disclosure-button-container .gux-disclosure-button gux-icon{width:12px;height:12px}.gux-disclosure-button-container .gux-disclosure-button:focus{outline:none}.gux-disclosure-button-container .gux-disclosure-panel{display:none;order:-1;width:100%}.gux-disclosure-button-container .gux-disclosure-panel.gux-active{display:block}.gux-disclosure-button-container.gux-right{justify-content:flex-end}.gux-disclosure-button-container.gux-right .gux-disclosure-panel{order:1}";

const GuxDisclosureButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.active = index.createEvent(this, "active", 7);
    this.panelId = randomHtmlId.randomHTMLId('gux-disclosure-button-panel');
    this.position = 'left';
    this.label = undefined;
    this.isOpen = false;
    this.icon = 'arrow-solid-right';
  }
  watchIsOpen() {
    this.updateIcon();
  }
  changeState() {
    this.togglePanel();
    this.active.emit(this.isOpen);
  }
  togglePanel() {
    this.isOpen = !this.isOpen;
  }
  updateIcon() {
    if (this.position === 'right') {
      this.icon = this.isOpen ? 'arrow-solid-right' : 'arrow-solid-left';
    }
    else {
      this.icon = this.isOpen ? 'arrow-solid-left' : 'arrow-solid-right';
    }
  }
  async componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.position });
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    this.updateIcon();
  }
  render() {
    return (index.h("div", { class: `gux-disclosure-button-container gux-${this.position}` }, index.h("button", { class: "gux-disclosure-button", onClick: () => this.changeState(), "aria-controls": this.panelId, "aria-expanded": this.isOpen.toString(), "aria-label": this.label || this.i18n('defaultLabel') }, index.h("gux-icon", { "icon-name": `${this.icon}`, decorative: true })), index.h("div", { id: this.panelId, class: {
        'gux-disclosure-panel': true,
        'gux-active': this.isOpen
      }, role: "region" }, index.h("slot", { name: "panel-content" }))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "isOpen": ["watchIsOpen"]
  }; }
};
GuxDisclosureButton.style = guxDisclosureButtonCss;

exports.gux_disclosure_button = GuxDisclosureButton;
