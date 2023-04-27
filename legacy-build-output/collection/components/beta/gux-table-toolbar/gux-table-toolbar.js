var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host, readTask } from '@stencil/core';
import { MIN_CONTROL_SPACING } from './gux-table-toolbar.constants';
import { OnResize } from '@utils/decorator/on-resize';
import { OnMutation } from '@utils/decorator/on-mutation';
import { trackComponent } from '@utils/tracking/usage';
import { setAccent, setActionsIconOnlyProp } from './gux-table-toolbar.service';
import { getSlot } from '@utils/dom/get-slot';
/**
 * @slot search-and-filter - Slot for search and filter.
 * @slot contextual-actions - Slot for contextual actions.
 * @slot permanent-actions - Slot for permanent actions.
 * @slot menu-actions - Slot for menu actions.
 * @slot primary-action - Slot for a primary action.
 */
export class GuxTableToolbar {
  constructor() {
    this.minimumSizes = {
      full: 0,
      iconOnly: 0,
      condensed: 0
    };
    this.displayedLayout = 'full';
    this.hasContextDivider = false;
  }
  onMutation() {
    this.hasContextDivider = this.needsContextDivider();
  }
  /**
   * Record the minimum size for the current layout.
   */
  recordLayoutMinSize() {
    readTask(() => {
      var _a, _b;
      const filterWidth = ((_a = this.filterSlot) === null || _a === void 0 ? void 0 : _a.clientWidth) | 0;
      const controlWidth = ((_b = this.actionsContainer) === null || _b === void 0 ? void 0 : _b.clientWidth) | 0;
      const minSize = filterWidth + controlWidth + MIN_CONTROL_SPACING;
      this.minimumSizes[this.displayedLayout] = minSize;
    });
  }
  get actionsContainer() {
    return this.root.shadowRoot.querySelector('.gux-contextual-permanent-primary');
  }
  get filterSlot() {
    return getSlot(this.root, 'search-and-filter');
  }
  get menuActionSlot() {
    return getSlot(this.root, 'menu-actions');
  }
  get permanentSlot() {
    return getSlot(this.root, 'permanent-actions');
  }
  get contextualSlot() {
    return getSlot(this.root, 'contextual-actions');
  }
  get primaryAction() {
    var _a;
    return (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-table-toolbar-custom-action[slot]');
  }
  get permanentActions() {
    var _a, _b;
    if ((_a = this.permanentSlot) === null || _a === void 0 ? void 0 : _a.hasChildNodes) {
      return Array.from((_b = this.permanentSlot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'));
    }
  }
  get menuActionsItems() {
    var _a, _b;
    if ((_a = this.menuActionSlot) === null || _a === void 0 ? void 0 : _a.hasChildNodes) {
      return Array.from((_b = this.menuActionSlot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'));
    }
  }
  get contextualActions() {
    var _a, _b;
    if ((_a = this.contextualSlot) === null || _a === void 0 ? void 0 : _a.hasChildNodes) {
      return Array.from((_b = this.contextualSlot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'));
    }
  }
  get filterActions() {
    var _a, _b;
    if ((_a = this.filterSlot) === null || _a === void 0 ? void 0 : _a.hasChildNodes) {
      return Array.from((_b = this.filterSlot) === null || _b === void 0 ? void 0 : _b.querySelectorAll('gux-table-toolbar-action, gux-table-toolbar-custom-action'));
    }
  }
  get allFilterContextual() {
    var _a;
    return (_a = this.filterActions) === null || _a === void 0 ? void 0 : _a.concat(this.contextualActions);
  }
  needsContextDivider() {
    var _a;
    return (((_a = this.contextualActions) === null || _a === void 0 ? void 0 : _a.length) &&
      this.contextualSlot !== this.root.lastElementChild);
  }
  renderMenu() {
    var _a;
    return Boolean(((_a = this.menuActionsItems) === null || _a === void 0 ? void 0 : _a.length) || this.displayedLayout == 'condensed');
  }
  renderFullLayout() {
    this.displayedLayout = 'full';
    setActionsIconOnlyProp(false, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions);
  }
  renderIconOnlyLayoutScaleDown(controlWidth) {
    this.displayedLayout = 'iconOnly';
    setActionsIconOnlyProp(true, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions);
    //Save the width of the iconOnly section so when resizing backup we have a reference point.
    this.iconOnlySectionWidth = controlWidth;
  }
  renderIconOnlyLayoutScaleUp() {
    var _a, _b;
    this.displayedLayout = 'iconOnly';
    setAccent(this.permanentActions, 'secondary');
    setAccent(this.primaryAction, 'primary');
    setActionsIconOnlyProp(true, this.primaryAction, ...this.allFilterContextual, ...this.permanentActions);
    this.permanentActions && ((_a = this.root) === null || _a === void 0 ? void 0 : _a.appendChild(this.permanentSlot));
    this.primaryAction && ((_b = this.root) === null || _b === void 0 ? void 0 : _b.appendChild(this.primaryAction));
  }
  renderCondensedLayout() {
    var _a, _b;
    this.displayedLayout = 'condensed';
    this.permanentActions &&
      ((_a = this.menuActionSlot) === null || _a === void 0 ? void 0 : _a.appendChild(this.permanentSlot));
    this.primaryAction && ((_b = this.menuActionSlot) === null || _b === void 0 ? void 0 : _b.appendChild(this.primaryAction));
    setActionsIconOnlyProp(true, ...this.allFilterContextual);
    setActionsIconOnlyProp(false, ...this.permanentActions);
    setActionsIconOnlyProp(false, this.primaryAction);
    setAccent(this.menuActionsItems, 'ghost');
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.hasContextDivider = this.needsContextDivider();
  }
  componentDidLoad() {
    this.recordLayoutMinSize();
    this.checkResponsiveLayout();
    setAccent(this.menuActionsItems, 'ghost');
  }
  /**
   * When the layout changes, also check one more time to see if further layout
   * changes are needed. This is mostly important at component start when we
   * may need to step down twice, full -> icon and icon -> condensed
   */
  componentDidUpdate() {
    this.recordLayoutMinSize();
    this.checkResponsiveLayout();
  }
  checkResponsiveLayout() {
    readTask(() => {
      var _a;
      const controlWidth = ((_a = this.actionsContainer) === null || _a === void 0 ? void 0 : _a.clientWidth) | 0;
      const toolbarWidth = this.root.clientWidth;
      if (toolbarWidth <= this.minimumSizes.full &&
        toolbarWidth >= this.minimumSizes.iconOnly) {
        if (this.displayedLayout == 'full') {
          this.renderIconOnlyLayoutScaleDown(controlWidth);
        }
        else if (this.displayedLayout == 'condensed') {
          this.renderIconOnlyLayoutScaleUp();
        }
      }
      else if (toolbarWidth <= this.minimumSizes.iconOnly) {
        this.renderCondensedLayout();
      }
      else if (this.minimumSizes.iconOnly > this.minimumSizes.full) {
        this.renderIconOnlyLayoutScaleUp();
      }
      else {
        this.renderFullLayout();
      }
    });
  }
  render() {
    return (h(Host, { role: "toolbar", "aria-orientation": "horizontal" }, h("div", { class: "search-filter-container" }, h("slot", { name: "search-and-filter" })), h("div", { class: "section-spacing" }), h("div", { class: "gux-contextual-permanent-primary" }, h("div", { class: {
        'gux-contextual-wrapper': this.hasContextDivider
      } }, h("slot", { name: "contextual-actions" })), h("div", { class: "gux-permanent-menu-primary-wrapper" }, h("slot", { name: "permanent-actions" }), h("gux-table-toolbar-menu-button", { "show-menu": this.renderMenu() }, h("slot", { name: "menu-actions" })), h("slot", { name: "primary-action" })))));
  }
  static get is() { return "gux-table-toolbar-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-table-toolbar.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-table-toolbar.css"]
    };
  }
  static get states() {
    return {
      "displayedLayout": {},
      "hasContextDivider": {}
    };
  }
  static get elementRef() { return "root"; }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxTableToolbar.prototype, "onMutation", null);
__decorate([
  OnResize()
], GuxTableToolbar.prototype, "checkResponsiveLayout", null);
