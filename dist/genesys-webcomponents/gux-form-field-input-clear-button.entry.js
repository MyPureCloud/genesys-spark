import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const clear = "Clear";
const translationResources = {
	clear: clear
};

const guxFormFieldInputClearButtonCss = "button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button:not(:disabled):focus,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:12px;height:12px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const Gux = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { tabIndex: -1, type: "button", title: this.i18n('clear') }, h("gux-icon", { "icon-name": "close", decorative: true })));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
Gux.style = guxFormFieldInputClearButtonCss;

export { Gux as gux_form_field_input_clear_button };
