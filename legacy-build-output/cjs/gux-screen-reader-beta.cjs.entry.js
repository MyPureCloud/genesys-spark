'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxScreenReaderCss = ".gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";

const GuxScreenReader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h("span", { class: "gux-sr-only" }, index.h("slot", null)));
  }
  get root() { return index.getElement(this); }
};
GuxScreenReader.style = guxScreenReaderCss;

exports.gux_screen_reader_beta = GuxScreenReader;
