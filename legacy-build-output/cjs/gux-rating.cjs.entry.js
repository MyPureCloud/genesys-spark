'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const clamp = require('./clamp-1bb96117.js');
const usage = require('./usage-da9572bf.js');
const logError = require('./log-error-ddbca3a0.js');

const guxRatingCss = ":host{display:inline-flex;user-select:none}:host:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(117, 168, 255, 0.5)}.gux-rating-star-container{color:#2e394c}.gux-rating-star-container.gux-disabled{opacity:0.5}.gux-rating-star-container gux-icon{width:24px;height:24px}";

const GuxRating = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = 0;
    this.maxValue = 5;
    this.disabled = false;
    this.readonly = false;
  }
  onClick(event) {
    event.stopPropagation();
    if (this.disabled || this.readonly) {
      return;
    }
    const [clickedElement] = event.composedPath();
    const ratingStar = clickedElement.getRootNode();
    const clickedStarIndex = Array.from(this.starContainer.children).findIndex(child => child.shadowRoot === ratingStar);
    const clickedStarNominalValue = clickedStarIndex + 1;
    if (clickedStarNominalValue === this.value + 0.5) {
      this.updateRatingValue(clickedStarNominalValue);
    }
    else if (clickedStarNominalValue === this.value) {
      this.updateRatingValue(0);
    }
    else if (clickedStarNominalValue !== Math.floor(this.value)) {
      this.updateRatingValue(clickedStarNominalValue - 0.5);
    }
  }
  onKeyDown(event) {
    event.stopPropagation();
    if (this.disabled || this.readonly) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.updateRatingValue(this.value - 0.5);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.updateRatingValue(this.value + 0.5);
        break;
      case 'End':
        event.preventDefault();
        this.updateRatingValue(Infinity);
        break;
      case 'Home':
        event.preventDefault();
        this.updateRatingValue(-Infinity);
        break;
    }
  }
  updateRatingValue(newValue) {
    const validatedNewValue = clamp.clamp(newValue, 0, Array.from(this.starContainer.children).length);
    if (this.value !== validatedNewValue) {
      this.value = validatedNewValue;
      simulateNativeEvent.simulateNativeEvent(this.root, 'input');
      simulateNativeEvent.simulateNativeEvent(this.root, 'change');
    }
  }
  getRatingStarElements() {
    return [...Array(this.maxValue).keys()]
      .reduce((acc, cv) => {
      if (cv + 0.5 === this.value) {
        return acc.concat('rating-partial');
      }
      else if (cv + 1 <= this.value) {
        return acc.concat('rating-active');
      }
      return acc.concat('rating');
    }, [])
      .map(iconName => (index.h("gux-icon", { "icon-name": iconName, decorative: true })));
  }
  getTabIndex() {
    return this.disabled ? -1 : 0;
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  componentDidLoad() {
    if (!(this.root.getAttribute('aria-label') ||
      this.root.getAttribute('aria-labelledby'))) {
      logError.logWarn('gux-rating', '`gux-rating` requires a label. Either provide a label and associate it with the gux-rating element using `aria-labelledby` or add an `aria-label` attribute to the gux-rating element.');
    }
  }
  render() {
    return (index.h(index.Host, { role: "spinbutton", tabindex: this.getTabIndex(), "aria-readonly": this.readonly.toString(), "aria-valuenow": this.value, "aria-valuemin": "0", "aria-valuemax": this.maxValue }, index.h("div", { ref: (el) => (this.starContainer = el), class: {
        'gux-rating-star-container': true,
        'gux-disabled': this.disabled
      } }, this.getRatingStarElements())));
  }
  get root() { return index.getElement(this); }
};
GuxRating.style = guxRatingCss;

exports.gux_rating = GuxRating;
