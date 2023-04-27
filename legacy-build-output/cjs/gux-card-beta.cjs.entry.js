'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxCardCss = ":host{display:block;width:fit-content}.gux-card{box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;padding:16px;background-color:#fdfdfd;border:1px solid #e2e6ee;border-radius:4px}.gux-card.gux-outline{background-color:#fdfdfd}.gux-card.gux-filled{background-color:#f6f7f9}.gux-card.gux-raised{box-shadow:0 0 2px rgba(32, 41, 55, 0.16)}";

const GuxCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.accent = 'outline';
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h("div", { class: {
        'gux-card': true,
        [`gux-${this.accent}`]: true
      } }, index.h("slot", null)));
  }
  get root() { return index.getElement(this); }
};
GuxCard.style = guxCardCss;

exports.gux_card_beta = GuxCard;
