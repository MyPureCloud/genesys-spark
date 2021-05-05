import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

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

  @State()
  private slottedElementType: string = 'input' || 'select' || 'textarea';

  @State()
  private labelPosition: 'above' | 'beside' = 'above';

  @State()
  private required: boolean = true;

  componentWillLoad() {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"], textarea[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');

    const type = this.input.getAttribute('type');
    this.slottedElementType = this.input.tagName.toLowerCase();
    let variant = this.slottedElementType;
    if (this.slottedElementType === 'input') {
      variant = this.slottedElementType.concat('-').concat(type);
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
    if (this.label) {
      this.labelPosition = this.label.offsetWidth < 40 ? 'beside' : 'above';
    }
  }

  disconnectedCallback(): void {
    this.requiredObserver.disconnect();
  }

  private getInputCheckbox(): JSX.Element {
    return (
      <gux-input-checkbox>
        <slot name="input" />
        <slot name="label" />
      </gux-input-checkbox>
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

  private getInputColor(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-color>
            <slot name="input" />
          </gux-input-color>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputRange(
    displayUnits: string,
    valueInTooltip: boolean
  ): JSX.Element {
    return (
      <div class="guxlabel-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-range
            display-units={displayUnits}
            value-in-tooltip={valueInTooltip}
          >
            <slot name="input" />
          </gux-input-range>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputNumber(clearable: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-number slot="input" clearable={clearable}>
            <slot name="input" />
          </gux-input-number>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputSelect(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-select slot="input">
            <slot name="input" />
          </gux-input-select>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextLike(clearable: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-text-like slot="input" clearable={clearable}>
            <slot name="input" />
          </gux-input-text-like>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextArea(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <div
            class={{
              'gux-label-container': true,
              'gux-required': this.required
            }}
          >
            <slot name="label" slot="label" />
          </div>
          <gux-input-textarea slot="input" resize={this.resize}>
            <slot name="input" />
          </gux-input-textarea>
        </div>
        <div class="gux-error">
          <slot name="error" />
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
            return this.getInputCheckbox();
          case 'radio':
            return this.getInputRadio();
          case 'color':
            return this.getInputColor();
          case 'range':
            return this.getInputRange(this.displayUnits, this.valueInTooltip);
          case 'email':
          case 'password':
          case 'text':
            return this.getInputTextLike(this.clearable);
          case 'number':
            return this.getInputNumber(this.clearable);
          case 'search':
            return this.getInputTextLike(false);
          default:
            return (
              <div>
                <slot name="label" />
                <slot name="input" />
              </div>
            );
        }
      case 'select':
        return this.getInputSelect();
      case 'textarea':
        return this.getInputTextArea();
      default:
        return (
          <div>
            <slot name="label" />
            <slot name="input" />
          </div>
        );
    }
  }
}
