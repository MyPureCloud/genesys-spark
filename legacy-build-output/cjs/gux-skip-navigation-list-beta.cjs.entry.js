'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const usage = require('./usage-da9572bf.js');
require('./get-closest-element-ab4b2eee.js');

const navigationName = "Skip links navigation";
const translationResources = {
	navigationName: navigationName
};

const guxSkipNavigationListCss = ":host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}:host(:focus-within){position:inherit;top:inherit;left:inherit;width:inherit;height:inherit;overflow:inherit;position:absolute;top:0;right:0;bottom:0;left:0}.gux-container nav{width:fit-content;margin:40px auto}.gux-container nav ul{padding:0;margin:0}";

const GuxSkipNavigationList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h("div", { class: "gux-container" }, index.h("nav", { "aria-label": this.i18n('navigationName') }, index.h("ul", { role: "list" }, index.h("slot", null)))));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxSkipNavigationList.style = guxSkipNavigationListCss;

exports.gux_skip_navigation_list_beta = GuxSkipNavigationList;
