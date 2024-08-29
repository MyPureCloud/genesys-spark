import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';
import libphonenumber, {
  PhoneNumberFormat,
  PhoneNumberType
} from 'google-libphonenumber';
import { trackComponent } from '@utils/tracking/usage';
import {
  buildI18nForComponent,
  getDesiredLocale,
  GetI18nValue
} from '../../../i18n';
import countryResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { getRegionObjects } from './services/region-map.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { logWarn } from '@utils/error/log-error';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { Alpha2Code, Region, RegionObject } from './gux-phone.types';
import { focusInputElement } from '@utils/dom/focus-input-element';

@Component({
  styleUrl: 'gux-phone-input.scss',
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
  private regionObjects: RegionObject[] = [];
  private displayFormat: PhoneNumberFormat;
  private displayType: PhoneNumberType = PhoneNumberType.FIXED_LINE;
  private valueWhenFocused: string;
  private regionAlphaCodeWhenFocused: Alpha2Code;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string = '';

  /**
   * Default ISO 3166-1 alpha-2 region code.
   */
  @Prop()
  defaultRegion: Alpha2Code;

  @Prop()
  labelId: string;

  @Prop()
  hasError: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  required: boolean = false;

  // Display only. This chooses how to format the number within the input.
  @Prop()
  phoneNumberFormat: 'E164' | 'INTERNATIONAL' | 'NATIONAL' = 'NATIONAL';

  // Display only. This chooses the type of example number as the placeholder within the input.
  @Prop()
  phoneNumberType: 'FIXED_LINE' | 'TOLL_FREE' = 'FIXED_LINE';

  @Event() guxregionselect: EventEmitter<string>;

  @State()
  private regionOptions: JSX.Element[] = [];

  @State()
  private expanded: boolean = false;

  @State()
  private region: Region = null;

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async setRegionAlpha2Code(alpha2Code: Alpha2Code): Promise<void> {
    this._setRegionAlpha2Code(alpha2Code);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async setRegionDialCode(dialCode: string): Promise<void> {
    const newRegion = this.getRegionFromDialCode(dialCode);

    this.updateInputWithNewRegion(newRegion, this.region);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getRegion(): Promise<Region> {
    return this.region;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getFormattedNumber(
    format: typeof this.phoneNumberFormat = 'E164'
  ): Promise<string> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alpha2Code);
    const libFormat = this.parseDisplayFormat(format);

    return phone ? this.phoneUtil.format(phone, libFormat) : null;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getExtension(): Promise<string> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alpha2Code);

    return phone ? phone.getExtension() : null;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async isPossibleNumber(): Promise<boolean> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alpha2Code);

    return phone ? this.phoneUtil.isPossibleNumber(phone) : false;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async isValidNumber(): Promise<boolean> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alpha2Code);

    return phone ? this.phoneUtil.isValidNumber(phone) : false;
  }

  @Watch('value')
  updateValue(number: string): void {
    this._setRegionAlpha2Code(this.getRegionFromValue(number)?.alpha2Code);
  }

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

  @Watch('phoneNumberFormat')
  setDisplayFormat(format: typeof this.phoneNumberFormat) {
    this.displayFormat = this.parseDisplayFormat(format);
  }

  @Watch('phoneNumberType')
  setDisplayType(format: typeof this.phoneNumberType) {
    this.displayType = this.parsePhoneNumberType(format);
  }

  @Listen('internallistboxoptionsupdated')
  onInternallistboxoptionsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  @Listen('blur')
  onBlur(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);

    // Native change events are not composed so they will not propagate out of the outermost of the shadow DOM.
    if (
      this.value !== this.valueWhenFocused ||
      this.region?.alpha2Code !== this.regionAlphaCodeWhenFocused
    ) {
      simulateNativeEvent(this.root, 'change');
    }
  }

  @Listen('focus')
  onFocus(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
    this.valueWhenFocused = this.value;
    this.regionAlphaCodeWhenFocused = this.region?.alpha2Code;

    if (this.regionOptions.length === 0) {
      this.regionOptions = this.getRegionOptions();
    }
  }

  @Listen('focusout')
  onFocusout(): void {
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
    this.regionObjects = getRegionObjects(
      getDesiredLocale(this.root),
      this.i18n,
      this.phoneUtil
    );
    this.initialValueParse();
  }

  componentDidRender(): void {
    if (!this.listboxElement) {
      this.listboxElement = this.root.shadowRoot.querySelector('gux-listbox');
    }
  }

  componentDidLoad(): void {
    this.setInput();
    this.setListBox();
  }

  componentWillRender(): void {
    trackComponent(this.root);
  }

  private initialValueParse(): void {
    this.setDisplayFormat(this.phoneNumberFormat);
    this.setDisplayType(this.phoneNumberType);
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        this._setRegionAlpha2Code(
          this.getRegionFromValue(this.value)?.alpha2Code
        );
        this.value = this.phoneUtil.format(phone, this.displayFormat);
      } catch (e) {
        logWarn(this.root, 'Number cannot be parsed');
      }
    } else {
      this._setRegionAlpha2Code(this.defaultRegionCode);
      this.value = '';
    }
  }

  private parseDisplayFormat(
    format: typeof this.phoneNumberFormat
  ): libphonenumber.PhoneNumberFormat {
    let output: libphonenumber.PhoneNumberFormat;

    switch (format.toUpperCase()) {
      case 'INTERNATIONAL':
        output = PhoneNumberFormat.INTERNATIONAL;
        break;
      case 'E164':
        output = PhoneNumberFormat.E164;
        break;
      case 'NATIONAL':
      default:
        output = PhoneNumberFormat.NATIONAL;
        break;
    }

    return output;
  }

  private parsePhoneNumberType(
    phoneNumberType: typeof this.phoneNumberType
  ): libphonenumber.PhoneNumberType {
    const typeMap = {
      TOLL_FREE: PhoneNumberType.TOLL_FREE,
      FIXED_LINE: PhoneNumberType.FIXED_LINE
    };

    return typeMap[phoneNumberType] ?? PhoneNumberType.FIXED_LINE;
  }

  /** Returns parsed phone number object or null if utility threw an error (unknown region or impossible to parse number) */
  private parsePhoneNumber(
    value: string,
    region: Alpha2Code | 'ZZ' = 'ZZ'
  ): libphonenumber.PhoneNumber {
    try {
      return this.phoneUtil.parse(value, region);
    } catch (e) {
      return null;
    }
  }

  private onInputChange(number: string): void {
    this.value = number;
  }

  private regionObjectToRegion(regionObject: RegionObject): Region | null {
    let output: Region = null;

    if (regionObject) {
      const regionCopy = { ...regionObject };
      delete regionCopy.name;
      output = regionCopy;
    }

    return output;
  }

  private _setRegionAlpha2Code(regionCode: Alpha2Code): void {
    const newAlpha2Code = regionCode?.toUpperCase();
    const regionMatch = this.regionObjects.find(
      r => r.alpha2Code === newAlpha2Code
    );
    const newRegion = this.regionObjectToRegion(regionMatch);

    this.updateInputWithNewRegion(newRegion, this.region);
  }

  private updateInputWithNewRegion(region: Region, lastRegion: Region): void {
    this.region = region;

    if (
      this.value.startsWith('+') &&
      lastRegion?.dialCode !== region?.dialCode &&
      lastRegion !== null
    ) {
      const newValue = this.value.replace(
        lastRegion?.dialCode || '+',
        region?.dialCode || ''
      );

      if (this.value !== newValue) {
        this.value = newValue;
      }
    }
  }

  private get defaultRegionCode(): Alpha2Code | null {
    const defaultRegion = this.defaultRegion?.toUpperCase();
    const regionMatch = defaultRegion
      ? this.regionObjects.find(r => r.alpha2Code === defaultRegion)
      : undefined;

    return regionMatch?.alpha2Code ?? null;
  }

  private getRegionFromValue(number: string): Region {
    return this.isNationalNumber(number)
      ? this.region || null
      : this.getRegionFromDialCode(number);
  }

  private isNationalNumber(number: string): boolean {
    return !number.startsWith('+');
  }

  private getRegionFromDialCode(number: string): Region | null {
    const matches = this.regionObjects
      .filter(region => number.startsWith(region.dialCode))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(regionObj => this.regionObjectToRegion(regionObj));

    if (number === '+') {
      return this.region || null;
    }

    if (matches.length < 2) {
      return matches[0] || null;
    }

    try {
      // Use googlelib-phonenumber to parse and get the region code (primarily works for complete, valid numbers)
      const parsedNumber = this.phoneUtil.parse(number);
      const parsedRegionCode = this.phoneUtil.getRegionCodeForNumber(
        parsedNumber
      ) as Alpha2Code;

      const match = matches.find(r => r.alpha2Code === parsedRegionCode);

      if (match) {
        return match;
      }
    } catch (e) {
      // Error thrown while parsing, continue processing without googlelib-phonenumber
    }

    const currentRegionMatch = matches.find(
      r => r.alpha2Code === this.region?.alpha2Code
    );
    const defaultRegionMatch = matches.find(
      r => r.alpha2Code === this.defaultRegionCode
    );

    return currentRegionMatch || defaultRegionMatch || matches[0];
  }

  private stopPropagationOfInternalFocusEvents(event: FocusEvent): void {
    if (this.root.contains(event.relatedTarget as Node)) {
      event.stopImmediatePropagation();
    }
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

  private setInput(): void {
    this.inputElement = this.root.shadowRoot.querySelector('input[type="tel"]');

    preventBrowserValidationStyling(this.inputElement);

    this.inputElement.addEventListener('input', () => {
      this.onInputChange(this.inputElement.value);
    });
    this.inputElement.addEventListener('focusin', (event: FocusEvent) => {
      event.stopPropagation();
      this.collapseListbox('noFocusChange');
    });
  }

  private setListBox(): void {
    this.listboxElement.addEventListener('input', (event: InputEvent) => {
      const regionCode = (event.target as HTMLGuxListboxElement)
        .value as Alpha2Code;
      this.guxregionselect.emit(regionCode);
      this._setRegionAlpha2Code(regionCode);
      this.collapseListbox('focusFieldButton');
    });
    this.listboxElement.addEventListener('focusout', (event: FocusEvent) => {
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
      } else if (event.key === 'Escape') {
        this.collapseListbox('noFocusChange');
      }
    });
  }

  private renderExpandIcon(): JSX.Element {
    if (!this.disabled) {
      return (
        <gux-icon
          class="gux-expand-icon"
          iconName="custom/chevron-down-small-regular"
          decorative
        />
      ) as JSX.Element;
    }
  }

  private renderCountryButton(): JSX.Element {
    return (
      <div class="gux-region-select">
        <button
          type="button"
          class={{
            'gux-field gux-field-button': true,
            'gux-expanded': this.expanded,
            'gux-disabled': this.disabled
          }}
          disabled={this.disabled}
          onClick={this.fieldButtonClick.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
          aria-label={this.i18n('regionDropdownButton')}
        >
          <div class="gux-field-content">{this.renderButtonDisplay()}</div>
          {this.renderExpandIcon()}
        </button>
      </div>
    ) as JSX.Element;
  }

  private renderButtonDisplay(): JSX.Element {
    return (
      <div class="gux-selected-option">
        {this.region ? (
          <gux-flag-icon-beta
            flag={this.region?.alpha2Code}
            screenreader-text={this.i18n(this.region?.alpha2Code)}
          ></gux-flag-icon-beta>
        ) : (
          <gux-icon
            icon-name="fa/earth-africa-regular"
            screenreader-text={this.i18n('unknownRegion')}
          ></gux-icon>
        )}
      </div>
    ) as JSX.Element;
  }

  private renderInput(): JSX.Element {
    return (
      <div
        class="gux-input"
        onClick={() => focusInputElement(this.inputElement)}
      >
        <input
          id={'tel-input'}
          class={{
            'gux-phone-text-input': true,
            'gux-disabled': this.disabled
          }}
          type="tel"
          placeholder={this.phoneUtil.format(
            this.phoneUtil.getExampleNumberForType(
              this.region?.alpha2Code || this.defaultRegionCode || 'US',
              this.displayType
            ),
            this.displayFormat
          )}
          value={this.value}
          disabled={this.disabled}
        />
      </div>
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

  private getRegionOptions(): JSX.Element[] {
    return [
      (
        <gux-option value="">
          <span class="gux-option-content">
            <gux-icon icon-name="fa/earth-africa-regular" decorative></gux-icon>
            <span>
              {this.i18n('unknownRegion')}{' '}
              <span class="gux-country-code">(+)</span>
            </span>
          </span>
        </gux-option>
      ) as JSX.Element
    ].concat(
      this.regionObjects.map(
        region =>
          (
            <gux-option value={region.alpha2Code}>
              <span class="gux-option-content">
                <gux-flag-icon-beta flag={region.alpha2Code} />
                <span>
                  {region.name}{' '}
                  <span class="gux-country-code">({region.dialCode})</span>
                </span>
              </span>
            </gux-option>
          ) as JSX.Element
      )
    );
  }

  private renderPopup(): JSX.Element {
    return (
      <div slot="popup" class="gux-listbox-container">
        <gux-listbox
          aria-label={this.i18n('regionDropdown')}
          value={this.region ? this.region.alpha2Code : ''}
        >
          {this.regionOptions}
        </gux-listbox>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup
        expanded={this.expanded}
        disabled={this.disabled}
        exceed-target-width
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
