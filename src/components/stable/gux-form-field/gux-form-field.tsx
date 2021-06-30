import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { randomHTMLId } from '../../../utils/dom/random-html-id';

import { onRequiredChange } from '../../../utils/dom/on-attribute-change';
import { trackComponent } from '../../../usage-tracking';

import { GuxInputTextAreaResize } from './components/gux-input-textarea/gux-input-textarea.types';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 */
@Component({
  styleUrl: 'gux-form-field.less',
  tag: 'gux-form-field'
})
export class GuxFormField {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private requiredObserver: MutationObserver;
  private errorId = randomHTMLId('gux-form-field-error');
  private defaultLabelId = randomHTMLId('gux-form-field');

  @Element()
  private root: HTMLElement;

  @Prop()
  clearable: boolean;

  @Prop()
  resize: GuxInputTextAreaResize;

  @Prop()
  displayUnits: string;

  @Prop()
  valueInTooltip: boolean;

  @Prop()
  labelPosition: 'above' | 'beside' | 'screenreader';

  @State()
  private slottedElementType: string = 'input' || 'select' || 'textarea';

  @State()
  private computedLabelPosition: 'above' | 'beside' | 'screenreader' = 'above';

  @State()
  private required: boolean = true;

  componentWillLoad() {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"], textarea[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');

    const type = this.input.getAttribute('type');
    this.slottedElementType = this.input.tagName.toLowerCase();

    let labelPositionVariant;
    this.labelPosition
      ? (labelPositionVariant = this.labelPosition.toLowerCase())
      : (labelPositionVariant = 'none');

    // stops the html5 validation styling
    this.input.addEventListener('invalid', event => {
      event.preventDefault();
    });

    let variant = this.slottedElementType;
    if (this.slottedElementType === 'input') {
      variant = this.slottedElementType
        .concat('-')
        .concat(type)
        .concat('-')
        .concat(labelPositionVariant);
    }

    trackComponent(this.root, { variant });

    this.required = this.input.required;

    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );
  }

  componentWillRender() {
    this.computedLabelPosition = this.setComputedLabelPosition(
      this.label,
      this.labelPosition
    );
    this.validateFormIds();
  }

  disconnectedCallback(): void {
    this.requiredObserver.disconnect();
  }

  private getInputCheckbox(hasError: boolean): JSX.Element {
    return (
      <div>
        <gux-input-checkbox class={{ 'gux-input-error': hasError }}>
          <slot name="input" />
          <slot name="label" />
        </gux-input-checkbox>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputRadio(): JSX.Element {
    return (
      <gux-input-radio>
        <slot name="input" />
        <slot name="label" />
      </gux-input-radio>
    );
  }

  private getInputColor(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-color
            class={{
              'gux-input-error': hasError
            }}
          >
            <slot name="input" />
          </gux-input-color>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  private getInputRange(
    displayUnits: string,
    valueInTooltip: boolean
  ): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}

        <gux-input-range
          display-units={displayUnits}
          value-in-tooltip={valueInTooltip}
        >
          <slot name="input" />
        </gux-input-range>
      </div>
    );
  }

  private getInputNumber(clearable: boolean, hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-number
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
            clearable={clearable}
          >
            <slot name="input" />
          </gux-input-number>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  private getInputSelect(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-select
            slot="input"
            class={{
              'gux-input-error': hasError
            }}
          >
            <slot name="input" />
          </gux-input-select>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  private getInputTextLike(clearable: boolean, hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-text-like
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
            clearable={clearable}
          >
            <slot name="input" />
          </gux-input-text-like>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  private getInputSearch(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-search>
            <slot name="input" />
          </gux-input-search>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  private getInputTextArea(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.getLabel()}
        <div class="gux-input-and-error-container">
          <gux-input-textarea
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
            resize={this.resize}
          >
            <slot name="input" />
          </gux-input-textarea>
          {this.getError(hasError)}
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const type = this.input.getAttribute('type');
    const hasError = this.hasErrorSlot();
    switch (this.slottedElementType) {
      case 'input':
        switch (type) {
          case 'checkbox':
            return this.getInputCheckbox(hasError);
          case 'radio':
            return this.getInputRadio();
          case 'color':
            return this.getInputColor(hasError);
          case 'range':
            return this.getInputRange(this.displayUnits, this.valueInTooltip);
          case 'email':
          case 'password':
          case 'text':
            return this.getInputTextLike(this.clearable, hasError);
          case 'number':
            return this.getInputNumber(this.clearable, hasError);
          case 'search':
            return this.getInputSearch(hasError);
          default:
            return (
              <div>
                <slot name="label" />
                <slot name="input" />
                <slot name="error" />
              </div>
            );
        }
      case 'select':
        return this.getInputSelect(hasError);
      case 'textarea':
        return this.getInputTextArea(hasError);
      default:
        return (
          <div>
            <slot name="label" />
            <slot name="input" />
            <slot name="error" />
          </div>
        );
    }
  }

  private validateFormIds() {
    if (this.label) {
      const inputHasId = !!this.input.hasAttribute('id');
      const labelHasFor = !!this.label.hasAttribute('for');
      if (!inputHasId && labelHasFor) {
        throw new Error(
          '[gux-form-field] A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.'
        );
      } else if (!inputHasId) {
        this.input.setAttribute('id', this.defaultLabelId);
        this.label.setAttribute('for', this.defaultLabelId);
      } else if (inputHasId && !labelHasFor) {
        const forId = this.input.getAttribute('id');
        this.label.setAttribute('for', forId);
      } else if (
        inputHasId &&
        labelHasFor &&
        this.input.getAttribute('id') !== this.label.getAttribute('for')
      ) {
        throw new Error(
          '[gux-form-field] The input id and label for attribute should match.'
        );
      }
    } else {
      throw new Error(
        '[gux-form-field] A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.'
      );
    }
    if (this.hasErrorSlot()) {
      this.input.setAttribute('aria-describedby', this.errorId);
    } else if (
      this.input.getAttribute('aria-describedby') &&
      this.input
        .getAttribute('aria-describedby')
        .startsWith('gux-form-field-error')
    ) {
      this.input.removeAttribute('aria-describedby');
    }
  }

  private setComputedLabelPosition(label, labelPosition) {
    if (label) {
      if (
        labelPosition === 'above' ||
        labelPosition === 'beside' ||
        labelPosition === 'screenreader'
      ) {
        return labelPosition;
      } else if (label.offsetWidth > 1 && label.offsetWidth < 40) {
        return 'beside';
      } else {
        return 'above';
      }
    }
  }

  private hasErrorSlot(): boolean {
    return !!this.root.querySelector('[slot="error"]');
  }

  private getLabel(): JSX.Element {
    return (
      <div
        class={{
          'gux-label-container': true,
          'gux-required': this.required
        }}
      >
        <slot name="label" slot="label" />
      </div>
    );
  }

  private getError(hasError: boolean): JSX.Element {
    if (hasError) {
      return (
        <div class="gux-error" id={this.errorId}>
          <gux-error-message-beta>
            <slot name="error" />
          </gux-error-message-beta>
        </div>
      );
    }
  }
}
