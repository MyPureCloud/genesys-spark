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
import libphonenumber, { PhoneNumberFormat } from 'google-libphonenumber';
import { trackComponent } from '@utils/tracking/usage';
import { RegionCode } from './services/RegionCountryCodeMap';
import {
  buildI18nForComponent,
  getDesiredLocale,
  GetI18nValue
} from '../../../i18n';
import countryResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { getRegionObjects, RegionObject } from './services/region-map.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { logWarn } from '@utils/error/log-error';
import simulateNativeEvent from '@utils/dom/simulate-native-event';

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
  private regionObjects: RegionObject[] = [];
  private displayFormat: PhoneNumberFormat;
  private valueWhenFocused: string;
  private regionAlphaCodeWhenFocused: RegionCode;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string = '';

  /**
   * Default ISO 3166-1 alpha-2 region code.
   */
  @Prop()
  defaultRegion: RegionCode;

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

  @Event() guxregionselect: EventEmitter<InputEvent>;

  @State()
  private regionOptions: JSX.Element[] = [];

  @State()
  private expanded: boolean = false;

  @State()
  private region: Region = null;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setRegionAlphaCode(regionCode: RegionCode): Promise<void> {
    this._setRegionAlphaCode(regionCode);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setRegionDialCode(dialCode: string): Promise<void> {
    const newRegion = this.getRegionFromDialCode(dialCode);

    this.updateInputWithNewRegion(newRegion, this.region);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async getRegion(): Promise<Region> {
    return this.region;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async getFormattedNumber(
    format: typeof this.phoneNumberFormat = 'E164'
  ): Promise<string> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alphaCode);
    const libFormat = this.parseDisplayFormat(format);

    return phone ? this.phoneUtil.format(phone, libFormat) : null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async getExtension(): Promise<string> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alphaCode);

    return phone ? phone.getExtension() : null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isPossibleNumber(): Promise<boolean> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alphaCode);

    return phone ? this.phoneUtil.isPossibleNumber(phone) : false;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isValidNumber(): Promise<boolean> {
    const phone = this.parsePhoneNumber(this.value, this.region?.alphaCode);

    return phone ? this.phoneUtil.isValidNumber(phone) : false;
  }

  @Watch('value')
  private updateValue(number: string): void {
    this._setRegionAlphaCode(this.getRegionFromValue(number)?.alphaCode);
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
      this.region?.alphaCode !== this.regionAlphaCodeWhenFocused
    ) {
      simulateNativeEvent(this.root, 'change');
    }
  }

  @Listen('focus')
  onFocus(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
    this.valueWhenFocused = this.value;
    this.regionAlphaCodeWhenFocused = this.region?.alphaCode;

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
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        this._setRegionAlphaCode(
          this.getRegionFromValue(this.value)?.alphaCode
        );
        this.value = this.phoneUtil.format(phone, this.displayFormat);
      } catch (e) {
        logWarn(this.root, 'Number cannot be parsed');
      }
    } else {
      this._setRegionAlphaCode(this.defaultRegionCode);
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

  /** Returns parsed phone number object or null if utility threw an error (unknown region or impossible to parse number) */
  private parsePhoneNumber(
    value: string,
    region: RegionCode | 'ZZ' = 'ZZ'
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

  private _setRegionAlphaCode(regionCode: RegionCode): void {
    const newRegionCode = regionCode?.toUpperCase();

    const regionMatch = newRegionCode
      ? this.regionObjects.find(r => r.code === newRegionCode)
      : undefined;

    const newRegion = regionMatch
      ? { alphaCode: regionMatch.code, dialCode: regionMatch.countryCode }
      : null;

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

  private get defaultRegionCode(): RegionCode | null {
    const defaultRegion = this.defaultRegion?.toUpperCase();
    const regionMatch = defaultRegion
      ? this.regionObjects.find(r => r.code === defaultRegion)
      : undefined;

    return regionMatch?.code ?? null;
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
      .filter(region => number.startsWith(region.countryCode))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map<Region>(r => ({ alphaCode: r.code, dialCode: r.countryCode }));

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
      ) as RegionCode;

      const match = matches.find(r => r.alphaCode === parsedRegionCode);

      if (match) {
        return match;
      }
    } catch (e) {
      // Error thrown while parsing, continue processing without googlelib-phonenumber
    }

    const currentRegionMatch = matches.find(
      r => r.alphaCode === this.region?.alphaCode
    );
    const defaultRegionMatch = matches.find(
      r => r.alphaCode === this.defaultRegionCode
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
      this.guxregionselect.emit(event);
      this._setRegionAlphaCode(
        (event.target as HTMLGuxListboxElement).value as RegionCode
      );
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

  private renderCountryButton(): JSX.Element {
    return (
      <div class="gux-region-select">
        <button
          type="button"
          class="gux-field gux-field-button"
          disabled={this.disabled}
          onClick={this.fieldButtonClick.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
          aria-label={this.i18n('regionDropdownButton')}
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
    return (
      <div class="gux-selected-option">
        {this.region ? (
          <gux-region-icon
            region={this.region?.alphaCode}
            screenreader-text={this.i18n(this.region?.alphaCode)}
          />
        ) : (
          <gux-icon
            icon-name="globe"
            screenreader-text={this.i18n('unknownRegion')}
          ></gux-icon>
        )}
      </div>
    ) as JSX.Element;
  }

  private renderInput(): JSX.Element {
    return (
      <input
        id={'tel-input'}
        class="gux-phone-text-input"
        type="tel"
        placeholder={this.phoneUtil.format(
          this.phoneUtil.getExampleNumber(this.region?.alphaCode || 'US'),
          this.displayFormat
        )}
        value={this.value}
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

  private getRegionOptions(): JSX.Element[] {
    return [
      (
        <gux-option value="">
          <span class="gux-option-content">
            <gux-icon icon-name="globe" decorative></gux-icon>
            <span>{this.i18n('unknownRegion')}</span>
            <span class="gux-country-code">+</span>
          </span>
        </gux-option>
      ) as JSX.Element
    ].concat(
      this.regionObjects.map(
        region =>
          (
            <gux-option value={region.code}>
              <span class="gux-option-content">
                <gux-region-icon region={region.code} />
                <span>{region.name}</span>
                <span class="gux-country-code">{region.countryCode}</span>
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
          value={this.region ? this.region.alphaCode : ''}
        >
          {this.regionOptions}
        </gux-listbox>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup-beta expanded={this.expanded} disabled={this.disabled}>
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup-beta>
    ) as JSX.Element;
  }
}

interface Region {
  alphaCode: RegionCode;
  dialCode: string;
}
