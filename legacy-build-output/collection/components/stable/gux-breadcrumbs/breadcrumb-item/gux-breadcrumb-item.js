import { h } from '@stencil/core';
import { logError } from '../../../../utils/error/log-error';
/**
 * @slot - content
 */
export class GuxBreadcrumbItem {
  constructor() {
    this.href = undefined;
  }
  getAccent() {
    const container = this.root.closest('gux-breadcrumbs');
    if (container) {
      return container.accent;
    }
    else {
      logError('gux-breadcrumb-item', 'This component must be a child of a gux-breadcrumbs component.');
    }
  }
  isLastBreadcrumb() {
    const parentNode = this.root.parentNode;
    const children = parentNode.children;
    return children[children.length - 1] === this.root;
  }
  getBreadcrumb() {
    if (!this.href || this.isLastBreadcrumb()) {
      return (h("span", { class: "gux-breadcrumb-content" }, h("slot", null)));
    }
    return (h("a", { class: "gux-breadcrumb-content gux-link", href: this.href }, h("slot", null)));
  }
  getSeparatorIcon(accent) {
    if (this.isLastBreadcrumb()) {
      return null;
    }
    switch (accent) {
      case 'primary':
        return (h("span", { class: "gux-breadcrumb-separator", "aria-hidden": "true" }, "/"));
      case 'secondary':
        return (h("gux-icon", { class: "gux-breadcrumb-separator", "icon-name": "chevron-small-right", decorative: true }));
      default:
        return (h("span", { class: "gux-breadcrumb-separator", "aria-hidden": "true" }, "/"));
    }
  }
  render() {
    const accent = this.getAccent();
    return (h("span", { class: `gux-breadcrumb-generation gux-${accent}` }, this.getBreadcrumb(), this.getSeparatorIcon(accent)));
  }
  static get is() { return "gux-breadcrumb-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-breadcrumb-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-breadcrumb-item.css"]
    };
  }
  static get properties() {
    return {
      "href": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "href",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "root"; }
}
