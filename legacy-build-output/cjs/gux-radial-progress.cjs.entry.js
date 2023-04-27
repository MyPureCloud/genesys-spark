'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const logError = require('./log-error-ddbca3a0.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const clamp = require('./clamp-1bb96117.js');

const RADIUS = 23.5;
const STROKE_DASH = 2 * Math.PI * RADIUS;
function canShowPercentageState(value, max) {
  return !(isNaN(value) || isNaN(max) || value > max || value < 0 || max === 0);
}
function getPercentageString(value, max, scale) {
  const scaleFactor = Math.pow(10, clamp.clamp(scale, 0, 2));
  return `${Math.round(((value + Number.EPSILON) / max) * 100 * scaleFactor) /
    scaleFactor}%`;
}

const GuxPercentageState = ({ value, max, scale, dropshadowId, screenreaderText }) => {
  return (index.h("div", { role: "progressbar", "aria-valuenow": value, "aria-valuemin": "0", "aria-valuemax": max, "aria-label": screenreaderText },
    index.h("svg", { class: "gux-svg-container", width: "60px", height: "60px", viewBox: "0 0 60 60", role: "presentation" },
      index.h("filter", { id: dropshadowId },
        index.h("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "1.4" }),
        index.h("feOffset", { dx: "0", dy: "0", result: "offsetblur" }),
        index.h("feMerge", null,
          index.h("feMergeNode", null),
          index.h("feMergeNode", { in: "SourceGraphic" }))),
      index.h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-static-circle" }),
      index.h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-dynamic-circle-shadow", "stroke-dashoffset": STROKE_DASH * (1 - value / max), "stroke-dasharray": STROKE_DASH, "stroke-linecap": "round", filter: 'url(#' + dropshadowId + ')' }),
      index.h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-dynamic-circle", "stroke-dashoffset": STROKE_DASH * (1 - value / max), "stroke-dasharray": STROKE_DASH, "stroke-linecap": "round" }),
      index.h("text", { x: "50%", y: "50%", "dominant-baseline": "central", class: {
          'gux-percentage': true,
          'gux-small': ![0, 1].includes(scale)
        } }, getPercentageString(value, max, scale)))));
};
const GuxSpinnerState = ({ screenreaderText }) => {
  return (index.h("gux-radial-loading", { "screenreader-text": screenreaderText, context: "modal" }));
};

const guxRadialProgressCss = ":host{display:inline-block}div[role='progressbar'] .gux-svg-container{display:block}div[role='progressbar'] .gux-svg-container .gux-dynamic-circle{fill:none;stroke:#2a60c8;stroke-width:5;transform:rotate(-90deg);transform-origin:50% 50%}div[role='progressbar'] .gux-svg-container .gux-dynamic-circle-shadow{fill:none;stroke:#75a8ff;stroke-width:5;transform:rotate(-90deg);transform-origin:50% 50%}div[role='progressbar'] .gux-svg-container .gux-static-circle{fill:none;stroke:#deeaff;stroke-width:4}div[role='progressbar'] .gux-svg-container .gux-percentage{font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;text-anchor:middle;fill:#2e394c}div[role='progressbar'] .gux-svg-container .gux-percentage.gux-small{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}";

const GuxRadialProgress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dropshadowId = randomHtmlId.randomHTMLId('gux-dropshadow');
    this.value = undefined;
    this.max = 100;
    this.scale = 0;
    this.screenreaderText = '';
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  componentDidLoad() {
    if (!this.screenreaderText &&
      canShowPercentageState(this.value, this.max)) {
      logError.logWarn('gux-radial-progress', 'No screenreader-text provided. Provide a localized screenreader-text property for the component.');
    }
  }
  render() {
    return canShowPercentageState(this.value, this.max)
      ? (index.h(GuxPercentageState, { value: this.value, max: this.max, scale: this.scale, dropshadowId: this.dropshadowId, screenreaderText: this.screenreaderText }))
      : (index.h(GuxSpinnerState, { screenreaderText: this.screenreaderText }));
  }
  get root() { return index.getElement(this); }
};
GuxRadialProgress.style = guxRadialProgressCss;

exports.gux_radial_progress = GuxRadialProgress;
