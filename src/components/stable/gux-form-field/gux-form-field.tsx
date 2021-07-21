import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { OnMutation } from '../../../utils/decorator/on-mutation';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { logError } from '../../../utils/error/log-error';
import { onRequiredChange } from '../../../utils/dom/on-attribute-change';
import { trackComponent } from '../../../usage-tracking';

import { GuxInputTextAreaResize } from './components/gux-input-textarea/gux-input-textarea.types';
import {
  GuxFormFieldSlottedElementType,
  GuxFormFieldLabelPosition
} from './gux-form-field.types';

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
  private labelId = randomHTMLId('gux-form-field-label');
  private defaultInputId = randomHTMLId('gux-form-field');

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
  labelPosition: GuxFormFieldLabelPosition;

  @State()
  private slottedElementType: GuxFormFieldSlottedElementType;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private required: boolean = true;

  @State()
  private hasError: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = Boolean(this.root.querySelector('[slot="error"]'));
  }

  componentWillLoad(): void {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"], textarea[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');

    this.slottedElementType =
      this.input.tagName.toLowerCase() as GuxFormFieldSlottedElementType;

    this.required = this.input.required;

    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );

    // stops the html5 validation styling
    this.input.addEventListener('invalid', event => {
      event.preventDefault();
    });

    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';

    if (this.slottedElementType === 'input') {
      const type = this.input.getAttribute('type');

      trackComponent(this.root, {
        variant: `${this.slottedElementType}-${type}-${labelPositionVariant}`
      });
    } else {
      trackComponent(this.root, {
        variant: `${this.slottedElementType}-${labelPositionVariant}`
      });
    }
  }

  componentWillRender(): void {
    this.computedLabelPosition = this.getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
    this.validateFormIds();
  }

  disconnectedCallback(): void {
    this.requiredObserver.disconnect();
  }

  private renderInputCheckbox(hasError: boolean): JSX.Element {
    return (
      <div>
        <gux-input-checkbox class={{ 'gux-input-error': hasError }}>
          <slot name="input" />
          <slot name="label" />
        </gux-input-checkbox>
        {this.renderError(hasError)}
      </div>
    );
  }

  private renderInputRadio(): JSX.Element {
    return (
      <gux-input-radio>
        <slot name="input" />
        <slot name="label" />
      </gux-input-radio>
    );
  }

  private renderInputColor(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
        <div class="gux-input-and-error-container">
          <gux-input-color
            gux-label-id={this.labelId}
            gux-error-id={this.errorId}
            gux-required={this.required}
            class={{
              'gux-input-error': hasError
            }}
          >
            <slot name="input" />
          </gux-input-color>
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  private renderInputRange(
    displayUnits: string,
    valueInTooltip: boolean
  ): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}

        <gux-input-range
          display-units={displayUnits}
          value-in-tooltip={valueInTooltip}
        >
          <slot name="input" />
        </gux-input-range>
      </div>
    );
  }

  private renderInputNumber(
    clearable: boolean,
    hasError: boolean
  ): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
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
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  private renderInputSelect(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
        <div class="gux-input-and-error-container">
          <gux-input-select
            slot="input"
            class={{
              'gux-input-error': hasError
            }}
          >
            <slot name="input" />
          </gux-input-select>
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  private renderInputTextLike(
    clearable: boolean,
    hasError: boolean
  ): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
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
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  private renderInputSearch(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
        <div class="gux-input-and-error-container">
          <gux-input-search>
            <slot name="input" />
          </gux-input-search>
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  private renderInputTextArea(hasError: boolean): JSX.Element {
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        {this.renderLabel(this.required)}
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
          {this.renderError(hasError)}
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const type = this.input.getAttribute('type');

    switch (this.slottedElementType) {
      case 'input':
        switch (type) {
          case 'checkbox':
            return this.renderInputCheckbox(this.hasError);
          case 'radio':
            return this.renderInputRadio();
          case 'color':
            return this.renderInputColor(this.hasError);
          case 'range':
            return this.renderInputRange(
              this.displayUnits,
              this.valueInTooltip
            );
          case 'email':
          case 'password':
          case 'text':
            return this.renderInputTextLike(this.clearable, this.hasError);
          case 'number':
            return this.renderInputNumber(this.clearable, this.hasError);
          case 'search':
            return this.renderInputSearch(this.hasError);
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
        return this.renderInputSelect(this.hasError);
      case 'textarea':
        return this.renderInputTextArea(this.hasError);
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

  private validateFormIds(): void {
    if (this.label) {
      if (this.input.getAttribute('type') === 'color') {
        if (this.label.getAttribute('id')) {
          this.labelId = this.label.getAttribute('id');
        }
        this.label.setAttribute('id', this.labelId);
        return;
      }
      const inputHasId = !!this.input.hasAttribute('id');
      const labelHasFor = !!this.label.hasAttribute('for');
      if (!inputHasId && labelHasFor) {
        logError(
          'gux-form-field',
          'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.'
        );
      } else if (!inputHasId) {
        this.input.setAttribute('id', this.defaultInputId);
        this.label.setAttribute('for', this.defaultInputId);
      } else if (inputHasId && !labelHasFor) {
        const forId = this.input.getAttribute('id');
        this.label.setAttribute('for', forId);
      } else if (
        inputHasId &&
        labelHasFor &&
        this.input.getAttribute('id') !== this.label.getAttribute('for')
      ) {
        logError(
          'gux-form-field',
          'The input id and label for attribute should match.'
        );
      }
    } else {
      logError(
        'gux-form-field',
        'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.'
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

  private getComputedLabelPosition(
    label: HTMLElement,
    labelPosition: GuxFormFieldLabelPosition
  ): GuxFormFieldLabelPosition {
    if (label) {
      if (['above', 'beside', 'screenreader'].includes(labelPosition)) {
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

  private renderLabel(required: boolean): JSX.Element {
    return (
      <div
        class={{
          'gux-label-container': true,
          'gux-required': required
        }}
      >
        <slot name="label" slot="label" />
      </div>
    );
  }

  private renderError(hasError: boolean): JSX.Element {
    return (
      <div
        id={this.errorId}
        class={{
          'gux-error': true,
          'gux-show': hasError
        }}
      >
        <gux-error-message-beta>
          <slot name="error" />
        </gux-error-message-beta>
      </div>
    );
  }
}
