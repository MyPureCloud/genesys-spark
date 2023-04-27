import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxPageLoadingSpinnerCss = ":host{display:flex}.gux-spinner{margin:auto}";

const GuxPageLoadingSpinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.screenreaderText = undefined;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("gux-radial-loading", { class: "gux-spinner", "screenreader-text": this.screenreaderText, context: "full-page" }));
  }
  get root() { return getElement(this); }
};
GuxPageLoadingSpinner.style = guxPageLoadingSpinnerCss;

export { GuxPageLoadingSpinner as gux_page_loading_spinner };
