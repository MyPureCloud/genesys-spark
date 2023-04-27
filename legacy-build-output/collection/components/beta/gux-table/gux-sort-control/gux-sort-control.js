import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import { getClosestElement } from '../../../../utils/dom/get-closest-element';
import { onMutation } from '../../../../utils/dom/on-mutation';
import tableResources from '../i18n/en.json';
export class GuxSortControl {
  constructor() {
    this.includeUnsorted = false;
    this.headerContent = undefined;
    this.active = false;
    this.sort = 'none';
    this.isLeftAlignIcon = false;
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
    this.tableHeader = getClosestElement('th', this.root);
    this.thObserver = onMutation(this.tableHeader, () => {
      this.setState();
    }, {
      attributes: true,
      childList: false,
      subtree: false
    });
    this.setState();
  }
  disconnectedCallback() {
    if (this.thObserver) {
      this.thObserver.disconnect();
    }
  }
  onClick() {
    this.guxsortchanged.emit({
      columnName: this.tableHeader.dataset.columnName,
      sortDirection: this.getNextSort(this.sort)
    });
  }
  setState() {
    this.headerContent = this.tableHeader.textContent;
    this.isLeftAlignIcon =
      this.tableHeader.hasAttribute('data-cell-numeric') ||
        this.tableHeader.hasAttribute('data-cell-action');
    const ariaSort = this.tableHeader.getAttribute('aria-sort');
    switch (ariaSort) {
      case 'ascending':
      case 'descending':
        this.active = true;
        this.sort = ariaSort;
        break;
      default:
        this.active = false;
        this.sort = 'none';
    }
  }
  getIconName(colSortDirection) {
    switch (colSortDirection) {
      case 'descending':
        return 'arrow-solid-up';
      case 'ascending':
      default:
        return 'arrow-solid-down';
    }
  }
  getNextSort(colSortDirection) {
    switch (colSortDirection) {
      case 'none':
        return 'ascending';
      case 'ascending':
        return 'descending';
      case 'descending':
      default: {
        if (this.includeUnsorted) {
          return 'none';
        }
        return 'ascending';
      }
    }
  }
  getSRText(colSortDirection) {
    switch (colSortDirection) {
      case 'ascending':
        return this.i18n('ascendingColumnSort', {
          headerContent: this.headerContent
        });
      case 'descending': {
        if (this.includeUnsorted) {
          return this.i18n('descendingColumnSortIncludeUnsorted', {
            headerContent: this.headerContent
          });
        }
        return this.i18n('descendingColumnSort', {
          headerContent: this.headerContent
        });
      }
      default:
        return this.i18n('noColumnSort', { headerContent: this.headerContent });
    }
  }
  render() {
    return (h("div", { class: "gux-container" }, h("button", { class: {
        'gux-sort-button': true,
        'gux-active': this.active
      }, type: "button", onClick: () => this.onClick() }, h("span", { class: "gux-sr-only" }, this.getSRText(this.sort)), h("gux-icon", { class: {
        'gux-sort-icon': true,
        'gux-left': this.isLeftAlignIcon
      }, "icon-name": this.getIconName(this.sort), decorative: true })), h("div", { class: "gux-resize-spacer" })));
  }
  static get is() { return "gux-sort-control"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-sort-control.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-sort-control.css"]
    };
  }
  static get properties() {
    return {
      "includeUnsorted": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "include-unsorted",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "headerContent": {},
      "active": {},
      "sort": {},
      "isLeftAlignIcon": {}
    };
  }
  static get events() {
    return [{
        "method": "guxsortchanged",
        "name": "guxsortchanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "GuxTableSortState",
          "resolved": "GuxTableSortState",
          "references": {
            "GuxTableSortState": {
              "location": "import",
              "path": "../gux-table.types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "root"; }
}
