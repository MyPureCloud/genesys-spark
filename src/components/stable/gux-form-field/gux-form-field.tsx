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
  private errorID = randomHTMLId('gux-form-field');
  private hasLabelFor: boolean;

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
  labelPosition: 'above' | 'beside';

  @State()
  private slottedElementType: string = 'input' || 'select' || 'textarea';

  @State()
  private computedLabelPosition: 'above' | 'beside' = 'above';

  @State()
  private required: boolean = true;

  componentWillLoad() {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"], textarea[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');

    const type = this.input.getAttribute('type');
    this.slottedElementType = this.input.tagName.toLowerCase();

    // stops the html5 validation styling
    this.input.addEventListener('invalid', event => {
      event.preventDefault();
    });

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
    this.hasLabelFor = !!this.root
      .querySelector('[slot="label"]')
      .hasAttribute('for');
  }

  componentWillRender() {
    if (this.label) {
      if (this.labelPosition === 'above' || this.labelPosition === 'beside') {
        this.computedLabelPosition = this.labelPosition;
      } else {
        this.computedLabelPosition =
          this.label.offsetWidth > 1 && this.label.offsetWidth < 40
            ? 'beside'
            : 'above';
      }
    }
  }

  disconnectedCallback(): void {
    this.requiredObserver.disconnect();
  }

  private getInputCheckbox(hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';

    return (
      <div>
        <Labeltag class="labeltag">
          <gux-input-checkbox
            class={{ 'gux-input-error': hasError }}
            aria-describedby={this.errorID}
          >
            <slot name="input" />
            <slot name="label" />
          </gux-input-checkbox>
        </Labeltag>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputRadio(): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <Labeltag class="labeltag">
        <gux-input-radio>
          <slot name="input" />
          <slot name="label" />
        </gux-input-radio>
      </Labeltag>
    );
  }

  private getInputColor(hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-color
              class={{
                'gux-input-error': hasError
              }}
              aria-describedby={this.errorID}
            >
              <slot name="input" />
            </gux-input-color>
          </Labeltag>
        </div>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputRange(
    displayUnits: string,
    valueInTooltip: boolean
  ): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
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
          </Labeltag>
        </div>
      </div>
    );
  }

  private getInputNumber(clearable: boolean, hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-number
              class={{
                'gux-input-error': hasError
              }}
              slot="input"
              clearable={clearable}
              aria-describedby={this.errorID}
            >
              <slot name="input" />
            </gux-input-number>
          </Labeltag>
        </div>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputSelect(hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-select
              slot="input"
              class={{
                'gux-input-error': hasError
              }}
              aria-describedby={this.errorID}
            >
              <slot name="input" />
            </gux-input-select>
          </Labeltag>
        </div>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputTextLike(clearable: boolean, hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-text-like
              class={{
                'gux-input-error': hasError
              }}
              slot="input"
              clearable={clearable}
              aria-describedby={this.errorID}
            >
              <slot name="input" />
            </gux-input-text-like>
          </Labeltag>
        </div>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputSearch(hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-search>
              <slot name="input" />
            </gux-input-search>
          </Labeltag>
        </div>
        {this.getError(hasError)}
      </div>
    );
  }

  private getInputTextArea(hasError: boolean): JSX.Element {
    const Labeltag = this.hasLabelFor ? 'div' : 'label';
    return (
      <div
        class={`gux-label-and-input-and-error-container gux-${this.computedLabelPosition}`}
      >
        <div class="gux-label-and-input-container">
          <Labeltag class="labeltag">
            <div
              class={{
                'gux-label-container': true,
                'gux-required': this.required
              }}
            >
              <slot name="label" slot="label" />
            </div>
            <gux-input-textarea
              class={{
                'gux-input-error': hasError
              }}
              slot="input"
              aria-describedby={this.errorID}
              resize={this.resize}
            >
              <slot name="input" />
            </gux-input-textarea>
          </Labeltag>
        </div>
        {this.getError(hasError)}
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

  private hasErrorSlot(): boolean {
    return !!this.root.querySelector('[slot="error"]');
  }

  private getError(hasError: boolean): JSX.Element {
    return (
      <div class="gux-error" id={this.errorID}>
        {hasError ? (
          <gux-error-message-beta>
            <slot name="error" />
          </gux-error-message-beta>
        ) : null}
      </div>
    );
  }
}
