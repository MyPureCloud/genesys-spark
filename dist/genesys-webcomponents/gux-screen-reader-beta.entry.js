import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxScreenReaderCss = ".gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";

const GuxScreenReader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("span", { class: "gux-sr-only" }, h("slot", null)));
  }
  get root() { return getElement(this); }
};
GuxScreenReader.style = guxScreenReaderCss;

export { GuxScreenReader as gux_screen_reader_beta };
