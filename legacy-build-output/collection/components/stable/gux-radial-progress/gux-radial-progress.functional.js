import { h } from '@stencil/core';
import { getPercentageString, RADIUS, STROKE_DASH } from './gux-radial-progress.service';
export const GuxPercentageState = ({ value, max, scale, dropshadowId, screenreaderText }) => {
  return (h("div", { role: "progressbar", "aria-valuenow": value, "aria-valuemin": "0", "aria-valuemax": max, "aria-label": screenreaderText }, h("svg", { class: "gux-svg-container", width: "60px", height: "60px", viewBox: "0 0 60 60", role: "presentation" }, h("filter", { id: dropshadowId }, h("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "1.4" }), h("feOffset", { dx: "0", dy: "0", result: "offsetblur" }), h("feMerge", null, h("feMergeNode", null), h("feMergeNode", { in: "SourceGraphic" }))), h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-static-circle" }), h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-dynamic-circle-shadow", "stroke-dashoffset": STROKE_DASH * (1 - value / max), "stroke-dasharray": STROKE_DASH, "stroke-linecap": "round", filter: 'url(#' + dropshadowId + ')' }), h("circle", { cx: "50%", cy: "50%", r: RADIUS, class: "gux-dynamic-circle", "stroke-dashoffset": STROKE_DASH * (1 - value / max), "stroke-dasharray": STROKE_DASH, "stroke-linecap": "round" }), h("text", { x: "50%", y: "50%", "dominant-baseline": "central", class: {
      'gux-percentage': true,
      'gux-small': ![0, 1].includes(scale)
    } }, getPercentageString(value, max, scale)))));
};
export const GuxSpinnerState = ({ screenreaderText }) => {
  return (h("gux-radial-loading", { "screenreader-text": screenreaderText, context: "modal" }));
};
