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
import { trackComponent } from '@utils/tracking/usage';
import {
  RegionCodes,
  regionCountryCodeMap
} from './services/RegionCountryCodeMap';
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
  private regionObjects: RegionObject[] = [];
  private displayFormat: PhoneNumberFormat;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  // ISO 3166-1 alpha-2 code
  @Prop()
  defaultRegion: RegionCodes;

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
  phoneNumberFormat: 'E164' | 'INTERNATIONAL' = 'INTERNATIONAL';

  // ISO 3166-1 alpha-2 code
  @State()
  region: string;

  @State()
  private expanded: boolean = false;

  // Emits value in E164 format
  @Event()
  input: EventEmitter<string>;

  @Event()
  phoneValidationError: EventEmitter<boolean>;

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
    this.setValidation();
    this.setInput();
    this.setListBox();
  }

  componentWillRender(): void {
    trackComponent(this.root);
    this.validateValue(this.region);
  }

  private initialValueParse(): void {
    this.setDisplayFormat();
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        this.numberText = this.phoneUtil.format(phone, this.displayFormat);
        this.region = this.getRegionCode(phone);
      } catch (e) {
        if (this.numberText === undefined) {
          // only show warning on initial render
          logWarn(this.root, 'Number cannot be parsed');
          this.numberText = this.value;
          this.region = '';
        }
      }
    } else {
      this.region = this.defaultRegion?.toUpperCase() || '';
      this.numberText = '';
    }

    if (this.listboxElement) {
      this.listboxElement.value = this.region;
    }
  }

  private onInputChange(number: string): void {
    if (number.startsWith('+')) {
      try {
        this.region = this.getRegionCode(this.phoneUtil.parse(number));
      } catch (e) {
        // parse failed, so check if there is a matching region in the string
        this.region = this.getRegionCodeFromRegionObjects(number);
      }
    }
    this.numberText = number;
    this.phoneNumberUpdated();
  }

  private getRegionCode(number: libphonenumber.PhoneNumber): string {
    let region = this.phoneUtil.getRegionCodeForNumber(number);

    // setting region to empty when either 001 (global satellite) or ZZ (unknown) are returned
    // phoneUtil doesn't always handle these cases in its other functions, so setting to an empty region (which is unknown with a globe as an icon) works best
    if (region === '001' || region === 'ZZ') {
      region = '';
    }

    return region;
  }

  private getRegionCodeFromRegionObjects(number: string): string {
    return (
      this.regionObjects
        .filter(region => number.startsWith(region.countryCode))
        .sort((a, b) => b.countryCode.length - a.countryCode.length)[0]?.code ||
      ''
    );
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
        this.phoneValidationError.emit(!isValid);
      } catch (e) {
        if (this.numberText) {
          logWarn(this.root, 'Number cannot be parsed');
          this.phoneValidationError.emit(true);
        }
      }
    }
  }

  private phoneNumberUpdated(): void {
    this.value = `+${this.numberText.replace(/\D/, '')}`;
    this.input.emit(this.value);
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
      if (this.numberText.startsWith('+')) {
        this.numberText = regionCountryCodeMap[this.region] || '';
      } else {
        this.numberText = regionCountryCodeMap[this.region]
          ? (regionCountryCodeMap[this.region] as string) + this.numberText
          : '';
      }
      this.phoneNumberUpdated();
    }
  }

  private setDisplayFormat() {
    switch (this.phoneNumberFormat) {
      case 'INTERNATIONAL':
        this.displayFormat = PhoneNumberFormat.INTERNATIONAL;
        break;
      case 'E164':
        this.displayFormat = PhoneNumberFormat.E164;
        break;
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
    const selectedListboxOptionElement: HTMLGuxOptionElement =
      this.getOptionElementByValue(this.region);

    return (
      <div class="gux-selected-option">
        {selectedListboxOptionElement?.value ? (
          <gux-region-icon
            region={this.region}
            screenreader-text={this.i18n(this.region)}
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
          this.phoneUtil.getExampleNumber(this.region || 'US'),
          this.displayFormat
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
    const options: JSX.Element[] = [
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

    return (
      <div slot="popup" class="gux-listbox-container">
        <gux-listbox aria-label={this.i18n('regionDropdown')}>
          {options}
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
