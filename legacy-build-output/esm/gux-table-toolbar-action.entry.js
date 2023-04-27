import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { c as capitalizeFirstLetter } from './capitalize-first-letter-d2512ec0.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const actionRefresh = "Refresh";
const actionDelete = "Delete";
const actionExport = "Export";
const actionImport = "Import";
const actionRevert = "Revert";
const actionAdd = "Add";
const translationResources = {
	actionRefresh: actionRefresh,
	actionDelete: actionDelete,
	actionExport: actionExport,
	actionImport: actionImport,
	actionRevert: actionRevert,
	actionAdd: actionAdd
};

const GuxTableToolbarAction = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.action = undefined;
    this.accent = 'secondary';
    this.iconOnly = false;
    this.disabled = false;
  }
  returnActionLocale(action) {
    return this.i18n(`action${capitalizeFirstLetter(action)}`);
  }
  returnActionTypeIcon(action) {
    return action == 'revert' ? 'reset' : action;
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("gux-table-toolbar-custom-action", { "icon-only": this.iconOnly, accent: this.accent, disabled: this.disabled }, h("span", { slot: "text" }, this.returnActionLocale(this.action)), h("gux-icon", { slot: "icon", "icon-name": this.returnActionTypeIcon(this.action), decorative: true })));
  }
  get root() { return getElement(this); }
};

export { GuxTableToolbarAction as gux_table_toolbar_action };
