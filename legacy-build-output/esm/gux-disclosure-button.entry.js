import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const defaultLabel = "Disclosure button";
const translationResources = {
	defaultLabel: defaultLabel
};

const guxDisclosureButtonCss = ":host{height:100%;color:#2e394c}.gux-disclosure-button-container{display:flex;flex-direction:row;justify-content:flex-start;height:100%}.gux-disclosure-button-container .gux-disclosure-button{width:16px;padding:0;margin:0;color:#2e394c;background:transparent;border-top:none;border-right:1px solid #e2e6ee;border-bottom:none;border-left:1px solid #e2e6ee}.gux-disclosure-button-container .gux-disclosure-button gux-icon{width:12px;height:12px}.gux-disclosure-button-container .gux-disclosure-button:focus{outline:none}.gux-disclosure-button-container .gux-disclosure-panel{display:none;order:-1;width:100%}.gux-disclosure-button-container .gux-disclosure-panel.gux-active{display:block}.gux-disclosure-button-container.gux-right{justify-content:flex-end}.gux-disclosure-button-container.gux-right .gux-disclosure-panel{order:1}";

const GuxDisclosureButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.active = createEvent(this, "active", 7);
    this.panelId = randomHTMLId('gux-disclosure-button-panel');
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
    trackComponent(this.root, { variant: this.position });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.updateIcon();
  }
  render() {
    return (h("div", { class: `gux-disclosure-button-container gux-${this.position}` }, h("button", { class: "gux-disclosure-button", onClick: () => this.changeState(), "aria-controls": this.panelId, "aria-expanded": this.isOpen.toString(), "aria-label": this.label || this.i18n('defaultLabel') }, h("gux-icon", { "icon-name": `${this.icon}`, decorative: true })), h("div", { id: this.panelId, class: {
        'gux-disclosure-panel': true,
        'gux-active': this.isOpen
      }, role: "region" }, h("slot", { name: "panel-content" }))));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["watchIsOpen"]
  }; }
};
GuxDisclosureButton.style = guxDisclosureButtonCss;

export { GuxDisclosureButton as gux_disclosure_button };
