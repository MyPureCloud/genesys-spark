import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';
import libphonenumber, { PhoneNumberFormat } from 'google-libphonenumber';
import { trackComponent } from '../../../usage-tracking';
import { countryCodeMap } from './services/CountryCodeMap';
import {
  buildI18nForComponent,
  getDesiredLocale,
  GetI18nValue
} from '../../../i18n';
import countryResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { getCountryObjects } from './services/country-map.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';

@Component({
  styleUrl: 'gux-phone-input.less',
  tag: 'gux-phone-input-beta',
  shadow: true
})
export class GuxPhoneInput {
  private i18n: GetI18nValue;
  private inputElement: HTMLInputElement;
  private listboxElement: HTMLGuxListboxElement;
  private fieldButtonElement: HTMLElement;
  private phoneUtil: libphonenumber.PhoneNumberUtil =
    libphonenumber.PhoneNumberUtil.getInstance();
  private numberText: string;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  defaultRegion: string = 'US';

  @Prop()
  labelId: string;

  @Prop()
  hasError: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  required: boolean;

  @State()
  region: string;

  @State()
  private expanded: boolean = false;

  @Event()
  input: EventEmitter<string>;

  @Event()
  internalError: EventEmitter<boolean>;

  @Watch('expanded')
  focusSelectedItemAfterRender(expanded: boolean) {
    if (expanded && this.listboxElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.listboxElement.focus();
        });
      });
    }
  }

  private validateValue(newValue: string) {
    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);

    if (selectedListboxOptionElement) {
      this.listboxElement.value = newValue;
      return;
    }
  }

  @Listen('internallistboxoptionsupdated')
  onInternallistboxoptionsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  @Listen('blur')
  onBlur(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
  }

  @Listen('focus')
  onFocus(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
  }

  @Listen('focusout')
  onFocusout(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
    this.collapseListbox('noFocusChange');
  }

  @Listen('focusin')
  onFocusin(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, countryResources);
    this.initialValueParse();
  }

  componentDidRender(): void {
    if (!this.listboxElement) {
      this.listboxElement = this.root.shadowRoot.querySelector('gux-listbox');
    }
  }

  componentDidLoad(): void {
    this.setValidation();
    this.setInput();
    this.setListBox();
  }

  componentWillRender(): void {
    trackComponent(this.root);
    this.validateValue(this.region);
  }

  private initialValueParse(): void {
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
        this.internalError.emit(!isValid);
      } catch (e) {
        if (this.numberText) {
          console.error('Number cannot be parsed');
          this.internalError.emit(true);
        }
      }
    }
  }

  private phoneNumberUpdated(): void {
    if (this.numberText) {
      this.value = `+${this.phoneUtil.getCountryCodeForRegion(
        this.region
      )}${this.numberText.replace(/\D/, '')}`;
      this.input.emit(this.value);
    }
  }

  private stopPropagationOfInternalFocusEvents(event: FocusEvent): void {
    if (this.root.contains(event.relatedTarget as Node)) {
      return event.stopImmediatePropagation();
    }
  }

  private getOptionElementByValue(value: string): HTMLGuxOptionElement {
    const listboxOptionElements =
      this.root.shadowRoot.querySelectorAll('gux-option');

    return Array.from(listboxOptionElements).find(
      listboxOptionElement => listboxOptionElement.value === value
    );
  }

  private fieldButtonClick(): void {
    this.expanded = !this.expanded;
  }

  private collapseListbox(
    focusChange: 'noFocusChange' | 'focusFieldButton'
  ): void {
    if (this.expanded) {
      this.expanded = false;
    }

    if (focusChange === 'focusFieldButton') {
      this.fieldButtonElement.focus();
    }
  }

  private updateRegion(newValue: string): void {
    if (this.region !== newValue) {
      this.collapseListbox('focusFieldButton');
      this.region = newValue;
      this.phoneNumberUpdated();
    }
  }

  private setValidation(): void {
    this.root.addEventListener('focusout', (event: FocusEvent) => {
      event.stopPropagation();
      this.validatePhoneNumber();
    });
  }

  private setInput(): void {
    this.inputElement = this.root.shadowRoot.querySelector('input[type="tel"]');

    preventBrowserValidationStyling(this.inputElement);

    this.inputElement.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();
      this.onInputChange(this.inputElement.value);
    });
    this.inputElement.addEventListener('focusin', (event: FocusEvent) => {
      event.stopPropagation();
      this.collapseListbox('noFocusChange');
    });
  }

  private setListBox(): void {
    this.listboxElement.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();

      this.updateRegion((event.target as HTMLGuxListboxElement).value);
    });
    this.listboxElement.addEventListener('change', (event: InputEvent) => {
      event.stopPropagation();
    });
    this.listboxElement.addEventListener('focusout', (event: InputEvent) => {
      event.stopPropagation();
    });
    this.listboxElement.addEventListener('keydown', (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Tab') {
        /* calling setTimeout is a workaround as calling focus without it does not work */
        if (event.shiftKey) {
          setTimeout(() => this.fieldButtonElement.focus(), 0);
        } else {
          setTimeout(() => this.inputElement.focus(), 0);
        }
      }
    });
  }

  private renderCountryButton(): JSX.Element {
    return (
      <div class="country-select">
        <button
          type="button"
          class="gux-field gux-field-button"
          disabled={this.disabled}
          onClick={this.fieldButtonClick.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
        >
          <div class="gux-field-content">{this.renderButtonDisplay()}</div>
          <gux-icon
            class="gux-expand-icon"
            iconName="chevron-small-down"
            decorative
          />
        </button>
      </div>
    ) as JSX.Element;
  }

  private renderButtonDisplay(): JSX.Element {
    const selectedListboxOptionElement = this.getOptionElementByValue(
      this.region
    );

    const selectedRegion = selectedListboxOptionElement?.value;
    const countryName = this.i18n(selectedRegion);
    const countryCode: string = countryCodeMap[selectedRegion] || '';

    return (
      <div class="gux-selected-option">
        <gux-country-icon
          countryCode={selectedRegion}
          countryName={countryName}
        />
        <span>{`+${countryCode}`}</span>
      </div>
    ) as JSX.Element;
  }

  private renderInput(): JSX.Element {
    return (
      <input
        id={'tel-input'}
        class="phone-input"
        type="tel"
        placeholder={this.phoneUtil.format(
          this.phoneUtil.getExampleNumber(this.region),
          PhoneNumberFormat.NATIONAL
        )}
        value={this.numberText}
        disabled={this.disabled}
      />
    ) as JSX.Element;
  }

  private renderTarget(): JSX.Element {
    return (
      <div
        class={{
          'target-container': true,
          'gux-error': this.hasError
        }}
        slot="target"
      >
        {this.renderCountryButton()}
        {this.renderInput()}
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    const options = [];
    for (const country of getCountryObjects(
      getDesiredLocale(this.root),
      this.i18n,
      this.phoneUtil
    )) {
      options.push(
        <gux-option value={country.key}>
          <span class="option-content">
            <gux-country-icon
              countryCode={country.key}
              countryName={country.name}
            />
            <span>{country.name}</span>
            <span class="country-code">{`+${country.code}`}</span>
          </span>
        </gux-option>
      );
    }

    return (
      <div slot="popup" class="gux-listbox-container">
        <gux-listbox aria-label="country dropdown">{options}</gux-listbox>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup expanded={this.expanded} disabled={this.disabled}>
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
