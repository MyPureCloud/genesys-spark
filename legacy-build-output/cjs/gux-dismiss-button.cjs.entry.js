'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const dismiss = "Dismiss";
const translationResources = {
	dismiss: dismiss
};

const guxDismissButtonCss = "button{position:absolute;top:0;right:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button.gux-inherit{position:inherit}button:not(:disabled):focus-visible,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:16px;height:16px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus gux-icon{outline:none}button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const GuxDismissButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.position = 'absolute';
  }
  async componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.position });
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h("button", { class: this.position == 'inherit' ? 'gux-inherit' : undefined, type: "button", title: this.i18n('dismiss') }, index.h("gux-icon", { "icon-name": "close", "screenreader-text": this.i18n('dismiss') })));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxDismissButton.style = guxDismissButtonCss;

exports.gux_dismiss_button = GuxDismissButton;
