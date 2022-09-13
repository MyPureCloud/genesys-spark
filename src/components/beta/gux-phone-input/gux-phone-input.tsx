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
import { GuxFormFieldLabel } from '../../stable/gux-form-field/functional-components/gux-form-field-label/gux-form-field-label';
import { GuxFormFieldContainer } from '../../stable/gux-form-field/functional-components/gux-form-field-container/gux-form-field-container';
import { GuxFormFieldLabelPosition } from '../../stable/gux-form-field/gux-form-field.types';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import {
  onDisabledChange,
  onRequiredChange
} from '@utils/dom/on-attribute-change';
import {
  getComputedLabelPosition,
  validateFormIds
} from '../../stable/gux-form-field/gux-form-field.service';

@Component({
  styleUrl: 'gux-phone-input.less',
  tag: 'gux-phone-input-beta',
  shadow: true
})
export class GuxPhoneInput {
  private inputWrapperElement: HTMLDivElement;
  private inputElement: HTMLInputElement;
  private labelElement: HTMLLabelElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;
  private phoneUtil: libphonenumber.PhoneNumberUtil =
    libphonenumber.PhoneNumberUtil.getInstance();
  private numberText: string;

  @Element()
  private root: HTMLElement;

  @Prop()
  defaultRegion: string = 'US';

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @Prop({ mutable: true })
  value: string;

  @State()
  private region: string;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasError: boolean = false;

  @Event()
  input: EventEmitter<string>;

  @Event()
  error: EventEmitter<boolean>;

  @Listen('internalregionupdated')
  updateCountry(event: CustomEvent) {
    this.region = event.detail as string;
    if (this.numberText) {
      this.phoneNumberUpdated();
    }
  }

  componentWillLoad(): void {
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        this.numberText = this.phoneUtil.format(
          phone,
          PhoneNumberFormat.NATIONAL
        );
        this.region = this.phoneUtil.getRegionCodeForNumber(phone);
      } catch (e) {
        if (this.numberText === undefined) {
          // only show error on initial render
          console.error('Number cannot be parsed');
          this.numberText = '';
          this.region = this.defaultRegion.toUpperCase();
        }
      }
    } else {
      this.numberText = '';
      this.region = this.defaultRegion.toUpperCase();
    }
  }

  componentWillRender(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.setValidation();
    this.setInput();
    this.setLabel();
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }

  private onInputChange(number: string): void {
    this.numberText = number;
    this.phoneNumberUpdated();
  }

  private validatePhoneNumber(): void {
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        const isValid =
          phone &&
          this.phoneUtil.isValidNumberForRegion(
            phone,
            this.phoneUtil.getRegionCodeForNumber(phone)
          );
        this.error.emit(!isValid);
        this.hasError = !isValid;
      } catch (e) {
        if (this.required || this.numberText) {
          console.error('Number cannot be parsed');
          this.error.emit(true);
          this.hasError = true;
        }
      }
    } else {
      this.error.emit(this.required);
      this.hasError = this.required;
    }
  }

  private phoneNumberUpdated(): void {
    this.value = `+${this.phoneUtil.getCountryCodeForRegion(
      this.region
    )}${this.numberText.replace(/\D/, '')}`;
    this.input.emit(this.value);
  }

  render(): JSX.Element {
    return (
      <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
        <GuxFormFieldLabel
          position={this.computedLabelPosition}
          required={this.required}
        >
          <slot name="label" onSlotchange={() => this.setLabel()} />
        </GuxFormFieldLabel>
        <div class="gux-input-and-error-container">
          <div
            class={{
              'gux-input-container': true,
              'gux-input-error': this.hasError
            }}
          >
            <gux-country-select region={this.region} disabled={this.disabled} />
            <input
              id={'tel-input'}
              class="phone-input"
              type="tel"
              placeholder={this.phoneUtil.format(
                this.phoneUtil.getExampleNumber(this.region),
                PhoneNumberFormat.NATIONAL
              )}
              value={this.numberText}
            />
          </div>
        </div>
      </GuxFormFieldContainer>
    ) as JSX.Element;
  }

  private setValidation(): void {
    this.inputWrapperElement = this.root.shadowRoot.querySelector(
      'div[class="gux-input-container"]'
    );

    this.inputWrapperElement.addEventListener(
      'focusout',
      (event: FocusEvent) => {
        event.stopPropagation();
        this.validatePhoneNumber();
      }
    );
  }

  private setInput(): void {
    this.inputElement = this.root.shadowRoot.querySelector('input[type="tel"]');

    preventBrowserValidationStyling(this.inputElement);

    this.inputElement.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();
      this.onInputChange(this.inputElement.value);
    });
    this.disabledObserver = onDisabledChange(
      this.inputElement,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.inputElement,
      (required: boolean) => {
        this.required = required;
      }
    );

    validateFormIds(this.root, this.inputElement);
  }

  private setLabel(): void {
    this.labelElement = this.root.shadowRoot.querySelector(
      'label[slot="label"]'
    );

    this.computedLabelPosition = getComputedLabelPosition(
      this.labelElement,
      this.labelPosition
    );
  }
}
