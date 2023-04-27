'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const afterNextRender = require('./after-next-render-a09f528a.js');

const guxAnnounceCss = ":host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxAnnounce = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.politeness = 'polite';
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxAnnounce(text) {
    this.containerElement.innerText = '';
    afterNextRender.afterNextRender(() => {
      this.containerElement.innerText = text;
    });
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h(index.Host, { "aria-live": this.politeness }, index.h("slot", null), index.h("div", { ref: el => (this.containerElement = el) })));
  }
  get root() { return index.getElement(this); }
};
GuxAnnounce.style = guxAnnounceCss;

exports.gux_announce_beta = GuxAnnounce;
