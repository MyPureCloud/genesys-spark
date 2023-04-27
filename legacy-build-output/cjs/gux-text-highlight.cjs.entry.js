'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const search = require('./search-a2ed7f26.js');
const usage = require('./usage-da9572bf.js');

const GuxTextHighlight = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = undefined;
    this.highlight = undefined;
    this.strategy = 'start';
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    if (this.highlight && this.text) {
      switch (this.strategy) {
        case 'start':
          return this.renderStartsWith();
        case 'contains':
          return this.renderContains();
        case 'fuzzy':
          return this.renderFuzzy();
      }
    }
    return (index.h("span", null, this.text));
  }
  renderStartsWith() {
    if (this.text.toLowerCase().startsWith(this.highlight.toLowerCase())) {
      const highlight = this.text.substring(0, this.highlight.length);
      const after = this.text.substring(this.highlight.length);
      return (index.h("span", null, index.h("mark", null, highlight), after));
    }
    return (index.h("span", null, this.text));
  }
  renderContains() {
    const html = {
      highlighted: '',
      remaining: this.text
    };
    while (html.remaining.toLowerCase().includes(this.highlight.toLowerCase())) {
      const index = html.remaining
        .toLowerCase()
        .indexOf(this.highlight.toLowerCase());
      const before = html.remaining.substring(0, index);
      const highlight = html.remaining.substring(index, index + this.highlight.length);
      html.highlighted += before + `<mark>${highlight}</mark>`;
      html.remaining = html.remaining.substring(index + highlight.length);
    }
    return (index.h("span", { innerHTML: html.highlighted + html.remaining }));
  }
  renderFuzzy() {
    if (search.matchesFuzzy(this.highlight, this.text)) {
      const html = search.getFuzzyReplacements(this.highlight).reduce((acc, needle) => {
        const { 0: highlight, index, input } = acc.remaining.match(needle);
        const before = input.substring(0, index);
        const highlighted = `${acc.highlighted + before}<mark>${highlight}</mark>`;
        const remaining = input.substring(index + highlight.length);
        return { highlighted, remaining };
      }, {
        highlighted: '',
        remaining: this.text
      });
      return (index.h("span", { innerHTML: html.highlighted + html.remaining }));
    }
    return (index.h("span", null, this.text));
  }
  get root() { return index.getElement(this); }
};

exports.gux_text_highlight = GuxTextHighlight;
