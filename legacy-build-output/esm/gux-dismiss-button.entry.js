import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const dismiss = "Dismiss";
const translationResources = {
	dismiss: dismiss
};

const guxDismissButtonCss = "button{position:absolute;top:0;right:0;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}button.gux-inherit{position:inherit}button:not(:disabled):focus-visible,button:not(:disabled):hover{color:#2e394c;cursor:pointer}button gux-icon{width:16px;height:16px;margin:4px;border-radius:4px}button:focus{outline:none}button:focus gux-icon{outline:none}button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const GuxDismissButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.position = 'absolute';
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { class: this.position == 'inherit' ? 'gux-inherit' : undefined, type: "button", title: this.i18n('dismiss') }, h("gux-icon", { "icon-name": "close", "screenreader-text": this.i18n('dismiss') })));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxDismissButton.style = guxDismissButtonCss;

export { GuxDismissButton as gux_dismiss_button };
