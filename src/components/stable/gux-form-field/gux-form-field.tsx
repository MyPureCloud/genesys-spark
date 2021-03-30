import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

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
  private hasError: boolean;

  @Element()
  private root: HTMLElement;

  @Prop()
  clearable: boolean;

  @Prop()
  displayUnits: string;

  @State()
  private type: string;

  @State()
  private labelPosition: 'above' | 'beside' = 'above';

  componentWillLoad() {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');
    this.hasError = !!this.root.querySelector('span[slot="error"]');
    this.type = this.input.getAttribute('type');

    trackComponent(this.root, { variant: this.type });
  }

  componentWillRender() {
    if (this.label) {
      this.labelPosition = this.label.offsetWidth < 40 ? 'beside' : 'above';
    }
  }

  private getInputCheckbox(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class="gux-label-and-input-container">
          <gux-input-checkbox has-error={this.hasError}>
            <slot name="input" />
            <slot name="label" />
          </gux-input-checkbox>
        </div>
        <div class="gux-error">
          { this.hasError ?
            <gux-icon
              class="error-icon"
              decorative
              iconName="ic-alert-octo"
            />
          : null }
          <slot name="error" />
        </div>
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

  private getInputColor(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-color>
            <slot name="input" />
          </gux-input-color>
        </div>
        <div class="gux-error">
          { this.hasError ?
            <gux-icon
              class="error-icon"
              decorative
              iconName="ic-alert-octo"
            />
            : null }
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputRange(displayUnits: string): JSX.Element {
    return (
      <div class="guxlabel-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-range display-units={displayUnits}>
            <slot name="input" />
          </gux-input-range>
        </div>
        <div class="gux-error">
          { this.hasError ?
            <gux-icon
              class="error-icon"
              decorative
              iconName="ic-alert-octo"
            />
            : null }
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputNumber(clearable: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-number slot="input" has-error={this.hasError} clearable={clearable}>
            <slot name="input" />
          </gux-input-number>
        </div>
        <div class="gux-error">
          { this.hasError ?
            <gux-icon
              class="error-icon"
              decorative
              iconName="ic-alert-octo"
            />
            : null }
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextLike(clearable: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-text-like slot="input" has-error={this.hasError} clearable={clearable}>
            <slot name="input" />
          </gux-input-text-like>
        </div>
        <div class="gux-error">
          { this.hasError ?
            <gux-icon
              class="error-icon"
              decorative
              iconName="ic-alert-octo"
            />
            : null }
          <slot name="error" />
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    switch (this.type) {
      case 'checkbox':
        return this.getInputCheckbox();
      case 'radio':
        return this.getInputRadio();
      case 'color':
        return this.getInputColor();
      case 'range':
        return this.getInputRange(this.displayUnits);
      case 'email':
      case 'password':
      case 'select':
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
  }
}
