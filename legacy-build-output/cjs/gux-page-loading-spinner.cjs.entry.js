'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxPageLoadingSpinnerCss = ":host{display:flex}.gux-spinner{margin:auto}";

const GuxPageLoadingSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.screenreaderText = undefined;
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h("gux-radial-loading", { class: "gux-spinner", "screenreader-text": this.screenreaderText, context: "full-page" }));
  }
  get root() { return index.getElement(this); }
};
GuxPageLoadingSpinner.style = guxPageLoadingSpinnerCss;

exports.gux_page_loading_spinner = GuxPageLoadingSpinner;
