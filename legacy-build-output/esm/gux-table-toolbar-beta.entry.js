import { r as registerInstance, d as readTask, h, H as Host, g as getElement } from './index-816e34d8.js';
import { O as OnResize } from './on-resize-3784d0c6.js';
import { O as OnMutation } from './on-mutation-35d8145e.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { g as getSlot } from './get-slot-52d073f3.js';

/**
 * Below is the minimum spacing in px that is required between,
 * the controls aligned to the left and controls aligned to the right.
 */
const MIN_CONTROL_SPACING = 72;

function setAccent(actions, accent) {
  [].concat(actions).forEach(action => {
    if (action != null) {
      action.accent = accent;
    }
  });
}
function setActionsIconOnlyProp(iconOnly, ...actionSets) {
  actionSets
    .flat()
    .filter(action => action !== null && !action.hasAttribute('icon-only'))
    .forEach(action => (action.iconOnly = iconOnly));
}

const guxTableToolbarCss = ":host{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:100%;max-height:48px;padding:0 8px 16px 8px;background-color:#fdfdfd;border-radius:4px}:host .search-filter-container{width:260px;min-width:260px}:host slot[name='search-and-filter']::slotted(*){display:flex;flex-direction:row;gap:4px;align-content:flex-start;align-items:center}:host .section-spacing{display:flex;flex-direction:row;min-width:72px}:host .gux-contextual-permanent-primary{display:flex;flex-direction:row;justify-content:space-between}:host .gux-contextual-permanent-primary slot[name='permanent-actions']::slotted(*),:host .gux-contextual-permanent-primary slot[name='contextual-actions']::slotted(*){display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;align-content:flex-end;align-items:center}:host .gux-contextual-permanent-primary .gux-contextual-wrapper{padding-right:8px;border-right:1px solid #d7dce5}:host .gux-contextual-permanent-primary .gux-permanent-menu-primary-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;margin-left:8px}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxTableToolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxTableToolbar.prototype, "onMutation", null);
__decorate([
  OnResize()
], GuxTableToolbar.prototype, "checkResponsiveLayout", null);
GuxTableToolbar.style = guxTableToolbarCss;

export { GuxTableToolbar as gux_table_toolbar_beta };
