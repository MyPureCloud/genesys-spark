import { h, Host } from '@stencil/core';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import clamp from '../../../utils/number/clamp';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '../../../utils/error/log-error';
export class GuxRating {
  constructor() {
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
  static get is() { return "gux-rating"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-rating.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-rating.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "0"
      },
      "maxValue": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "max-value",
        "reflect": false,
        "defaultValue": "5"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "readonly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "readonly",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "onKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
