'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const capitalizeFirstLetter = require('./capitalize-first-letter-8e2f04e5.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

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
    index.registerInstance(this, hostRef);
    this.action = undefined;
    this.accent = 'secondary';
    this.iconOnly = false;
    this.disabled = false;
  }
  returnActionLocale(action) {
    return this.i18n(`action${capitalizeFirstLetter.capitalizeFirstLetter(action)}`);
  }
  returnActionTypeIcon(action) {
    return action == 'revert' ? 'reset' : action;
  }
  async componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.action });
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h("gux-table-toolbar-custom-action", { "icon-only": this.iconOnly, accent: this.accent, disabled: this.disabled }, index.h("span", { slot: "text" }, this.returnActionLocale(this.action)), index.h("gux-icon", { slot: "icon", "icon-name": this.returnActionTypeIcon(this.action), decorative: true })));
  }
  get root() { return index.getElement(this); }
};

exports.gux_table_toolbar_action = GuxTableToolbarAction;
