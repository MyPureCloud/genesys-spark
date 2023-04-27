import { h, readTask, writeTask } from '@stencil/core';
import Sortable from 'sortablejs';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import tabsResources from './i18n/en.json';
export class GuxTabsLegacy {
  constructor() {
    this.allowSort = false;
    this.showNewTabButton = false;
    this.value = '';
    this.tabLimit = Infinity;
    this.disableAddTabButton = false;
    this.hasScrollbar = false;
  }
  watchHandler(newValue) {
    const tabs = Array.from(this.root.querySelectorAll('gux-tab-legacy'));
    for (const tab of tabs) {
      tab.active = tab.tabId === newValue;
    }
  }
  internaltabselectedHandler(e) {
    whenEventIsFrom('gux-tab-legacy', e, elem => {
      const tab = elem;
      if (!tab.active) {
        this.value = tab.tabId;
        this.input.emit();
      }
    });
  }
  createSortable() {
    this.sortableInstance = new Sortable(this.root, {
      animation: 250,
      draggable: 'gux-tab-legacy',
      filter: '.ignore-sort',
      onMove: (event) => {
        return !event.related.classList.contains('ignore-sort');
      },
      onUpdate: () => {
        const tabIds = Array.from(this.root.querySelectorAll('gux-tab-legacy')).map(tabElement => tabElement.tabId);
        this.sortChanged.emit(tabIds);
      }
    });
  }
  destroySortable() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
      this.sortableInstance = null;
    }
  }
  disconnectedCallback() {
    if (this.sortableInstance) {
      this.destroySortable();
    }
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root.shadowRoot.querySelector('.gux-tabs'));
    }
    if (this.domObserver) {
      this.domObserver.disconnect();
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, tabsResources);
  }
  componentWillRender() {
    const tabs = Array.from(this.root.querySelectorAll('gux-tab-legacy'));
    if (tabs.length >= this.tabLimit) {
      this.disableAddTabButton = true;
    }
  }
  checkForScrollbarHideOrShow() {
    readTask(() => {
      const el = this.root.shadowRoot.querySelector('.scrollable-section');
      const hasScrollbar = el.clientWidth !== el.scrollWidth;
      if (hasScrollbar !== this.hasScrollbar) {
        this.hasScrollbar = hasScrollbar;
      }
    });
  }
  componentDidLoad() {
    if (this.allowSort && !this.sortableInstance) {
      this.createSortable();
    }
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.checkForScrollbarHideOrShow.bind(this));
    }
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root.shadowRoot.querySelector('.gux-tabs'));
    }
    if (!this.domObserver && window.MutationObserver) {
      this.domObserver = new MutationObserver(this.checkForScrollbarHideOrShow.bind(this));
    }
    if (this.domObserver) {
      this.domObserver.observe(this.root, {
        childList: true,
        attributes: false,
        subtree: true
      });
    }
    setTimeout(() => {
      this.checkForScrollbarHideOrShow();
    }, 500);
  }
  componentDidRender() {
    setTimeout(() => {
      readTask(() => {
        if (this.value) {
          const activeTab = this.root.querySelector(`gux-tab-legacy[tab-id='${this.value}']`);
          if (activeTab) {
            activeTab.active = true;
          }
        }
      });
    }, 500);
  }
  scrollLeft() {
    writeTask(() => {
      this.root.shadowRoot
        .querySelector('.scrollable-section')
        .scrollBy(-100, 0);
    });
  }
  scrollRight() {
    writeTask(() => {
      this.root.shadowRoot
        .querySelector('.scrollable-section')
        .scrollBy(100, 0);
    });
  }
  render() {
    const AddNewTabButton = (props) => {
      return (h("button", { title: this.disableAddTabButton
          ? this.i18n('disableNewTab')
          : this.i18n('createNewTab'), class: "add-tab", onClick: () => props.onClick(), disabled: this.disableAddTabButton }, h("gux-icon", { "icon-name": "add", decorative: true })));
    };
    return (h("div", { class: "gux-tabs" }, h("div", { class: "action-button-container" }, this.hasScrollbar ? (h("button", { title: this.i18n('scrollLeft'), class: "arrow-button", onClick: () => this.scrollLeft() }, h("gux-icon", { "icon-name": "chevron-left", decorative: true }))) : null), h("div", { class: "scrollable-section" }, h("slot", null), this.showNewTabButton && !this.hasScrollbar ? (h(AddNewTabButton, { onClick: () => this.newTab.emit() })) : null), h("div", { class: "action-button-container" }, this.hasScrollbar ? (h("button", { title: this.i18n('scrollRight'), class: "arrow-button", onClick: () => this.scrollRight() }, h("gux-icon", { "icon-name": "chevron-right", decorative: true }))) : null, this.showNewTabButton && this.hasScrollbar ? (h(AddNewTabButton, { onClick: () => this.newTab.emit() })) : null)));
  }
  static get is() { return "gux-tabs-legacy"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tabs-legacy.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tabs-legacy.css"]
    };
  }
  static get properties() {
    return {
      "allowSort": {
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
          "text": "Enable tab sorting by drag/drop"
        },
        "attribute": "allow-sort",
        "reflect": false,
        "defaultValue": "false"
      },
      "showNewTabButton": {
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
          "text": "Enable new tab button"
        },
        "attribute": "show-new-tab-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "value": {
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
          "text": "tabId of the currently selected tab"
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      },
      "tabLimit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum nuber of tabs created"
        },
        "attribute": "tab-limit",
        "reflect": false,
        "defaultValue": "Infinity"
      }
    };
  }
  static get states() {
    return {
      "disableAddTabButton": {},
      "hasScrollbar": {}
    };
  }
  static get events() {
    return [{
        "method": "newTab",
        "name": "newTab",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the new tab button is selected."
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "input",
        "name": "input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when a tab is selected."
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "sortChanged",
        "name": "sortChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the sorting of the tabs is changed."
        },
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "watchHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "internaltabselected",
        "method": "internaltabselectedHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
