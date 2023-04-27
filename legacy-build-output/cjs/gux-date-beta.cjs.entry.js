'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const DateTimeFormatter = require('./DateTimeFormatter-224cf9e8.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const GuxDate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.datetime = new Date().toISOString();
    this.format = 'short';
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
    this.formatter = new DateTimeFormatter.DateTimeFormatter(index$1.getDesiredLocale(this.root));
  }
  render() {
    return (index.h(index.Host, null, this.formatter.formatDate(new Date(this.datetime), this.format)));
  }
  get root() { return index.getElement(this); }
};

exports.gux_date_beta = GuxDate;
