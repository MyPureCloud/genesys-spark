import { Component, Element, h, JSX, State } from '@stencil/core';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 */
@Component({
  styleUrl: 'gux-form-field-beta.less',
  tag: 'gux-form-field-beta'
})
export class GuxFormFieldBeta {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;

  @Element()
  private root: HTMLGuxFormFieldBetaElement;

  @State()
  private type: string;

  @State()
  private labelPosition: 'above' | 'beside' = 'above';

  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"]');
    this.label = this.root.querySelector('label[slot="label"]');
    this.type = this.input.getAttribute('type');
  }

  componentWillRender() {
    if (this.label) {
      this.labelPosition = this.label.offsetWidth < 40 ? 'beside' : 'above';
    }
  }

  private getInputCheckbox(): JSX.Element {
    return (
      <gux-input-checkbox-beta>
        <slot name="input" />
        <slot name="label" />
      </gux-input-checkbox-beta>
    );
  }

  private getInputRadio(): JSX.Element {
    return (
      <gux-input-radio-beta>
        <slot name="input" />
        <slot name="label" />
      </gux-input-radio-beta>
    );
  }

  private getInputColor(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-color-beta>
            <slot name="input" />
          </gux-input-color-beta>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputRange(): JSX.Element {
    return (
      <div class="guxlabel-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-range-beta>
            <slot name="input" />
          </gux-input-range-beta>
        </div>
        <div class="gux-error">
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextLike(): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-text-like-beta slot="input">
            <slot name="input" />
          </gux-input-text-like-beta>
        </div>
        <div class="gux-error">
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
        return this.getInputRange();
      case 'email':
      case 'number':
      case 'password':
      case 'search':
      case 'text':
        return this.getInputTextLike();
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
