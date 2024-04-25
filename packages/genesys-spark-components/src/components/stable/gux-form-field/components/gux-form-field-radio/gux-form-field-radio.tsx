import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';

import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { hasSlot } from '@utils/dom/has-slot';

import {
  GuxFormFieldError,
  GuxFormFieldHelp
} from '../../functional-components/functional-components';

import { validateFormIds, getSlottedInput } from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
@Component({
  styleUrl: 'gux-form-field-radio.scss',
  tag: 'gux-form-field-radio',
  shadow: true
})
export class GuxFormFieldRadio {
  private input: HTMLInputElement;
  private disabledObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @State()
  private disabled: boolean;

  @State()
  private hasHelp: boolean = false;

  @State()
  private hasError: boolean = false;

  @Prop()
  hasGroupError: boolean = false;

  @Prop()
  hasGroupDisabled: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }

  componentWillLoad(): void {
    this.setInput();

    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');

    trackComponent(this.root);
  }

  disconnectedCallback(): void {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }

  render(): JSX.Element {
    return (
      <Host
        class={{
          'gux-input-error': this.hasError || this.hasGroupError,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-form-field-container">
          <div class="gux-input-label">
            <div class="gux-input">
              <slot name="input" onSlotchange={() => this.setInput()} />
            </div>
            <div
              class="gux-label"
              aria-disabled={this.disabled ? 'true' : 'false'}
            >
              <slot name="label" />
              <GuxFormFieldError show={this.hasError}>
                <slot name="error" />
              </GuxFormFieldError>
              <GuxFormFieldHelp show={!this.hasError && this.hasHelp}>
                <slot name="help" />
              </GuxFormFieldHelp>
            </div>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }

  private setInput(): void {
    this.input = getSlottedInput(
      this.root,
      'input[type="radio"][slot="input"]'
    );

    if (this.hasGroupDisabled) {
      this.input.disabled = true;
    }
    preventBrowserValidationStyling(this.input);

    this.disabled = calculateInputDisabledState(this.input);

    this.disabledObserver = onInputDisabledStateChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );

    validateFormIds(this.root, this.input);
  }
}
