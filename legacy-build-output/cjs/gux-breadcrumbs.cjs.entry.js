'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const usage = require('./usage-da9572bf.js');
require('./get-closest-element-ab4b2eee.js');

const breadcrumbs = "Breadcrumbs";
const breadcrumbsResources = {
	breadcrumbs: breadcrumbs
};

const guxBreadcrumbsCss = ".gux-breadcrumbs-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}";

const GuxBreadcrumbs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.accent = 'primary';
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.accent });
  }
  async componentWillRender() {
    this.i18n = await index$1.buildI18nForComponent(this.root, breadcrumbsResources);
  }
  onSlotChange() {
    Array.from(this.root.children).forEach(child => index.forceUpdate(child));
  }
  render() {
    return (index.h("nav", { "aria-label": this.i18n('breadcrumbs'), class: "gux-breadcrumbs-container" }, index.h("slot", { onSlotchange: this.onSlotChange.bind(this) })));
  }
  get root() { return index.getElement(this); }
};
GuxBreadcrumbs.style = guxBreadcrumbsCss;

exports.gux_breadcrumbs = GuxBreadcrumbs;
