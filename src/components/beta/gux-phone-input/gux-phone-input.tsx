import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { GuxFormFieldLabel } from '../gux-form-field-v2/functional-components/gux-form-field-label/gux-form-field-label';
import { GuxFormFieldContainer } from '../gux-form-field-v2/functional-components/gux-form-field-container/gux-form-field-container';
import { GuxFormFieldLabelPosition } from '../gux-form-field-v2/gux-form-field.types';
import { preventBrowserValidationStyling } from '../../../utils/dom/prevent-browser-validation-styling';
import {
  onDisabledChange,
  onRequiredChange
} from '../../../utils/dom/on-attribute-change';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../gux-form-field-v2/gux-form-field.servce';
import { GuxFormFieldError } from '../gux-form-field-v2/functional-components/gux-form-field-error/gux-form-field-error';

@Component({
  styleUrl: 'gux-phone-input.less',
  tag: 'gux-phone-input-beta',
  shadow: true
})
export class GuxPhoneInput {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @Prop()
  defaultCountryCode: string;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @Prop()
  labelText: string;

  @State()
  private countryCode: string;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasError: boolean = false;

  componentWillRender(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.setInput();
    this.setLabel();
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
        >
          <label htmlFor={'tel-input'}>{this.labelText}</label>
        </GuxFormFieldLabel>
        <div class="gux-phone-container-and-error">
          <div class="gux-input-and-select-container">
            <div class="country-select-container">
              <gux-country-select
                countryCode={this.countryCode}
                defaultCountry={this.defaultCountryCode}
                disabled={this.disabled}
              />
            </div>
            <div
              class={{
                'gux-phone-input-container': true,
                'gux-input-error': this.hasError
              }}
            >
              <input id={'tel-input'} class="phone-input" type="tel" />
            </div>
          </div>
          {this.hasError ? (
            <GuxFormFieldError hasError={this.hasError}>
              <span>This has an Error</span>
            </GuxFormFieldError>
          ) : (
            ''
          )}
        </div>
      </GuxFormFieldContainer>
    ) as JSX.Element;
  }

  private setInput(): void {
    this.input = this.root.shadowRoot.querySelector('input[type="tel"]');

    preventBrowserValidationStyling(this.input);

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.input);
  }

  private setLabel(): void {
    this.label = this.root.shadowRoot.querySelector('label');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }
}
