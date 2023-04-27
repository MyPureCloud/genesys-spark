'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const logError = require('./log-error-ddbca3a0.js');

const guxBreadcrumbItemCss = ".gux-breadcrumb-generation{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:flex-start;align-items:center;justify-content:flex-start}.gux-breadcrumb-generation.gux-primary{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}.gux-breadcrumb-generation .gux-breadcrumb-content{color:#2e394c}.gux-breadcrumb-generation .gux-breadcrumb-content.gux-link{color:#2a60c8;text-decoration:none}.gux-breadcrumb-generation .gux-breadcrumb-content.gux-link:hover{text-decoration:underline}.gux-breadcrumb-generation .gux-breadcrumb-separator{margin:0 8px;color:#8a97ad}.gux-breadcrumb-generation gux-icon.gux-breadcrumb-separator{width:16px;height:16px;margin:0 4px}";

const GuxBreadcrumbItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.href = undefined;
  }
  getAccent() {
    const container = this.root.closest('gux-breadcrumbs');
    if (container) {
      return container.accent;
    }
    else {
      logError.logError('gux-breadcrumb-item', 'This component must be a child of a gux-breadcrumbs component.');
    }
  }
  isLastBreadcrumb() {
    const parentNode = this.root.parentNode;
    const children = parentNode.children;
    return children[children.length - 1] === this.root;
  }
  getBreadcrumb() {
    if (!this.href || this.isLastBreadcrumb()) {
      return (index.h("span", { class: "gux-breadcrumb-content" }, index.h("slot", null)));
    }
    return (index.h("a", { class: "gux-breadcrumb-content gux-link", href: this.href }, index.h("slot", null)));
  }
  getSeparatorIcon(accent) {
    if (this.isLastBreadcrumb()) {
      return null;
    }
    switch (accent) {
      case 'primary':
        return (index.h("span", { class: "gux-breadcrumb-separator", "aria-hidden": "true" }, "/"));
      case 'secondary':
        return (index.h("gux-icon", { class: "gux-breadcrumb-separator", "icon-name": "chevron-small-right", decorative: true }));
      default:
        return (index.h("span", { class: "gux-breadcrumb-separator", "aria-hidden": "true" }, "/"));
    }
  }
  render() {
    const accent = this.getAccent();
    return (index.h("span", { class: `gux-breadcrumb-generation gux-${accent}` }, this.getBreadcrumb(), this.getSeparatorIcon(accent)));
  }
  get root() { return index.getElement(this); }
};
GuxBreadcrumbItem.style = guxBreadcrumbItemCss;

exports.gux_breadcrumb_item = GuxBreadcrumbItem;
