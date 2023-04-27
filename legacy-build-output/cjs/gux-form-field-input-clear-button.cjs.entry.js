'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const clear = "Clear";
const translationResources = {
	clear: clear
};

const guxFormFieldInputClearButtonCss = "button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button:not(:disabled):focus-visible,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:12px;height:12px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const Gux = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h("button", { tabIndex: -1, type: "button", title: this.i18n('clear') }, index.h("gux-icon", { "icon-name": "close", decorative: true })));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
Gux.style = guxFormFieldInputClearButtonCss;

exports.gux_form_field_input_clear_button = Gux;
