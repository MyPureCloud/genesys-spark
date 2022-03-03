import { Component, Element, h, Host, JSX, State } from '@stencil/core';

import { OnMutation } from '../../../../../utils/decorator/on-mutation';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '../../../../../utils/dom/prevent-browser-validation-styling';
import { trackComponent } from '../../../../../usage-tracking';

import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';

import { hasErrorSlot, validateFormIds } from '../../gux-form-field.servce';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 */
@Component({
  styleUrl: 'gux-form-field-checkbox.less',
  tag: 'gux-form-field-checkbox-beta',
  shadow: true
})
export class GuxFormFieldCheckbox {
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
          <div class="gux-input">
            <slot name="input" onSlotchange={() => this.setInput()} />
            <slot name="label" />
          </div>
          <GuxFormFieldError hasError={this.hasError}>
            <slot name="error" />
          </GuxFormFieldError>
        </div>
      </Host>
    ) as JSX.Element;
  }

  private setInput(): void {
    this.input = this.root.querySelector(
      'input[type="checkbox"][slot="input"]'
    );

    preventBrowserValidationStyling(this.input);

    this.disabled = this.input.disabled;

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );

    validateFormIds(this.root, this.input);
  }
}
