import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { c as clamp } from './clamp-6bdb0367.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { a as logWarn } from './log-error-3d08c2b1.js';

const guxRatingCss = ":host{display:inline-flex;user-select:none}:host:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(117, 168, 255, 0.5)}.gux-rating-star-container{color:#2e394c}.gux-rating-star-container.gux-disabled{opacity:0.5}.gux-rating-star-container gux-icon{width:24px;height:24px}";

const GuxRating = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    const validatedNewValue = clamp(newValue, 0, Array.from(this.starContainer.children).length);
    if (this.value !== validatedNewValue) {
      this.value = validatedNewValue;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
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
      .map(iconName => (h("gux-icon", { "icon-name": iconName, decorative: true })));
  }
  getTabIndex() {
    return this.disabled ? -1 : 0;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  componentDidLoad() {
    if (!(this.root.getAttribute('aria-label') ||
      this.root.getAttribute('aria-labelledby'))) {
      logWarn('gux-rating', '`gux-rating` requires a label. Either provide a label and associate it with the gux-rating element using `aria-labelledby` or add an `aria-label` attribute to the gux-rating element.');
    }
  }
  render() {
    return (h(Host, { role: "spinbutton", tabindex: this.getTabIndex(), "aria-readonly": this.readonly.toString(), "aria-valuenow": this.value, "aria-valuemin": "0", "aria-valuemax": this.maxValue }, h("div", { ref: (el) => (this.starContainer = el), class: {
        'gux-rating-star-container': true,
        'gux-disabled': this.disabled
      } }, this.getRatingStarElements())));
  }
  get root() { return getElement(this); }
};
GuxRating.style = guxRatingCss;

export { GuxRating as gux_rating };
