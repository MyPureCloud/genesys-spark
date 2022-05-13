import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core';
import libphonenumber, { PhoneNumberFormat } from 'google-libphonenumber';
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
  private phoneUtil: libphonenumber.PhoneNumberUtil =
    libphonenumber.PhoneNumberUtil.getInstance();

  @Element()
  private root: HTMLElement;

  @Prop()
  defaultRegion: string = 'us';

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @Prop()
  labelText: string;

  @Prop()
  value: string;

  @State()
  phone: libphonenumber.PhoneNumber;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasError: boolean = false;

  @Event()
  phoneUpdated: EventEmitter;

  @Listen('internalregionupdated')
  updateCountry(event: CustomEvent) {
    this.phone.setCountryCode(event.detail as number);
    if (this.phone.hasNationalNumber()) {
      this.validatePhoneNumber();
    }
  }

  componentWillRender(): void {
    trackComponent(this.root);
    this.phone = this.value
      ? this.phoneUtil.parse(this.value)
      : this.phoneUtil.parse('', this.defaultRegion);
  }

  componentDidLoad(): void {
    this.setInput();
    this.setLabel();
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }

  private onInputChange(newValue: string): void {
    this.phone = this.phoneUtil.parse(
      `+${this.phone.getCountryCode()}${newValue}`
    );
  }

  private validatePhoneNumber(): void {
    this.hasError =
      this.phone &&
      !this.phoneUtil.isValidNumberForRegion(
        this.phone,
        this.phoneUtil.getRegionCodeForNumber(this.phone)
      );
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
                region={
                  this.phone
                    ? this.phoneUtil.getRegionCodeForNumber(this.phone)
                    : ''
                }
                defaultRegion={this.defaultRegion}
                disabled={this.disabled}
              />
            </div>
            <div
              class={{
                'gux-phone-input-container': true,
                'gux-input-error': this.hasError
              }}
            >
              <input
                id={'tel-input'}
                class="phone-input"
                type="tel"
                value={this.phoneUtil.format(
                  this.phone,
                  PhoneNumberFormat.NATIONAL
                )}
              />
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

    this.input.addEventListener('focusout', (event: FocusEvent) => {
      event.stopPropagation();
      this.onInputChange(this.input.value);
    });
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
