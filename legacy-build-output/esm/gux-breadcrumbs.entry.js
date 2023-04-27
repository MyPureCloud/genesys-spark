import { r as registerInstance, f as forceUpdate, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { t as trackComponent } from './usage-55de2afe.js';
import './get-closest-element-1597503c.js';

const breadcrumbs = "Breadcrumbs";
const breadcrumbsResources = {
	breadcrumbs: breadcrumbs
};

const guxBreadcrumbsCss = ".gux-breadcrumbs-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}";

const GuxBreadcrumbs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.accent = 'primary';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, breadcrumbsResources);
  }
  onSlotChange() {
    Array.from(this.root.children).forEach(child => forceUpdate(child));
  }
  render() {
    return (h("nav", { "aria-label": this.i18n('breadcrumbs'), class: "gux-breadcrumbs-container" }, h("slot", { onSlotchange: this.onSlotChange.bind(this) })));
  }
  get root() { return getElement(this); }
};
GuxBreadcrumbs.style = guxBreadcrumbsCss;

export { GuxBreadcrumbs as gux_breadcrumbs };
