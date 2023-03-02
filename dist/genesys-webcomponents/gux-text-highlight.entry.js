import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { m as matchesFuzzy, g as getFuzzyReplacements } from './search-2ca67cb1.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const GuxTextHighlight = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.text = undefined;
    this.highlight = undefined;
    this.strategy = 'start';
  }
  componentWillLoad() {
    trackComponent(this.root);
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
    return (h("span", null, this.text));
  }
  renderStartsWith() {
    if (this.text.toLowerCase().startsWith(this.highlight.toLowerCase())) {
      const highlight = this.text.substring(0, this.highlight.length);
      const after = this.text.substring(this.highlight.length);
      return (h("span", null, h("mark", null, highlight), after));
    }
    return (h("span", null, this.text));
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
    return (h("span", { innerHTML: html.highlighted + html.remaining }));
  }
  renderFuzzy() {
    if (matchesFuzzy(this.highlight, this.text)) {
      const html = getFuzzyReplacements(this.highlight).reduce((acc, needle) => {
        const { 0: highlight, index, input } = acc.remaining.match(needle);
        const before = input.substring(0, index);
        const highlighted = `${acc.highlighted + before}<mark>${highlight}</mark>`;
        const remaining = input.substring(index + highlight.length);
        return { highlighted, remaining };
      }, {
        highlighted: '',
        remaining: this.text
      });
      return (h("span", { innerHTML: html.highlighted + html.remaining }));
    }
    return (h("span", null, this.text));
  }
  get root() { return getElement(this); }
};

export { GuxTextHighlight as gux_text_highlight };
