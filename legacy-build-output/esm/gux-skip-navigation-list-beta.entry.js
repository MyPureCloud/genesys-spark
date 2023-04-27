import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { t as trackComponent } from './usage-55de2afe.js';
import './get-closest-element-1597503c.js';

const navigationName = "Skip links navigation";
const translationResources = {
	navigationName: navigationName
};

const guxSkipNavigationListCss = ":host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}:host(:focus-within){position:inherit;top:inherit;left:inherit;width:inherit;height:inherit;overflow:inherit;position:absolute;top:0;right:0;bottom:0;left:0}.gux-container nav{width:fit-content;margin:40px auto}.gux-container nav ul{padding:0;margin:0}";

const GuxSkipNavigationList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: "gux-container" }, h("nav", { "aria-label": this.i18n('navigationName') }, h("ul", { role: "list" }, h("slot", null)))));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxSkipNavigationList.style = guxSkipNavigationListCss;

export { GuxSkipNavigationList as gux_skip_navigation_list_beta };
