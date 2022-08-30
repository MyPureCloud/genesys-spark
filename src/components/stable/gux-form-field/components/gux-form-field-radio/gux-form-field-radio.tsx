import { Component, Element, h, Host, JSX, State } from '@stencil/core';

import { calculateInputDisabledState } from '../../../../../utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '../../../../../utils/dom/on-input-disabled-state-change';
import { OnMutation } from '../../../../../utils/decorator/on-mutation';
import { preventBrowserValidationStyling } from '../../../../../utils/dom/prevent-browser-validation-styling';
import { trackComponent } from '../../../../../usage-tracking';

import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';

import { hasErrorSlot, validateFormIds } from '../../gux-form-field.service';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 */
@Component({
  styleUrl: 'gux-form-field-radio.less',
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
  private hasError: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasErrorSlot(this.root);
  }

  componentWillLoad(): void {
    this.setInput();

    this.hasError = hasErrorSlot(this.root);

    trackComponent(this.root);
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
  }

  render(): JSX.Element {
    return (
      <Host
        class={{
          'gux-input-error': this.hasError,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-form-field-container">
          <div class="gux-input-label">
            <div class="gux-input">
              <slot name="input" onSlotchange={() => this.setInput()} />
            </div>
            <div class="gux-label">
              <slot name="label" />
              <GuxFormFieldError hasError={this.hasError}>
                <slot name="error" />
              </GuxFormFieldError>
            </div>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }

  private setInput(): void {
    this.input = this.root.querySelector('input[type="radio"][slot="input"]');

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
