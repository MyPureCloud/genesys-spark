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
import { trackComponent } from '../../../../../usage-tracking';
import { countryCodeMap } from './CountryCodeMap';
import { buildI18nForComponent, GetI18nValue } from '../../../../../i18n';
import countryResources from '../../i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';

@Component({
  styleUrl: 'gux-country-select.less',
  tag: 'gux-country-select',
  shadow: true
})
export class GuxCountrySelect {
  private i18n: GetI18nValue;
  private listboxElement: HTMLGuxListboxElement;
  private fieldButtonElement: HTMLElement;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  region: string;

  @Prop()
  defaultRegion: string = 'us';

  @Prop()
  labelId: string;

  @Prop()
  disabled: boolean = false;

  @State()
  private expanded: boolean = false;

  @Event()
  internalregionupdated: EventEmitter;

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

  // @Watch('countryCode')
  validateValue(newValue: string) {
    if (newValue === undefined) {
      this.region = this.defaultRegion;
      return;
    }

    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);

    if (selectedListboxOptionElement) {
      this.listboxElement.value = newValue;
      return;
    }

    this.region = this.defaultRegion;
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
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, countryResources);
  }

  componentDidRender(): void {
    if (!this.listboxElement) {
      this.listboxElement = this.root.shadowRoot.querySelector('gux-listbox');
    }
  }

  componentDidLoad(): void {
    this.listboxElement.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();

      this.updateRegion((event.target as HTMLGuxListboxElement).value);
    });
    this.listboxElement.addEventListener('change', (event: InputEvent) => {
      event.stopPropagation();
    });
  }

  componentWillRender(): void {
    this.validateValue(this.region);
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
      this.region = newValue;
      this.collapseListbox('focusFieldButton');
      console.log(countryCodeMap[this.region]);
      this.internalregionupdated.emit(countryCodeMap[this.region]);
    }
  }

  private renderTarget(): JSX.Element {
    return (
      <button
        type="button"
        class="gux-field gux-field-button"
        disabled={this.disabled}
        onClick={this.fieldButtonClick.bind(this)}
        ref={el => (this.fieldButtonElement = el)}
        aria-haspopup="listbox"
        aria-expanded={this.expanded.toString()}
        slot="target"
      >
        <div class="gux-field-content">{this.renderTargetDisplay()}</div>
        <gux-icon
          class={{
            'gux-expand-icon': true
          }}
          iconName="chevron-small-down"
          decorative
        />
      </button>
    ) as JSX.Element;
  }

  private renderTargetDisplay(): JSX.Element {
    const selectedListboxOptionElement = this.getOptionElementByValue(
      this.region
    );

    const selectedRegion =
      selectedListboxOptionElement?.value || this.defaultRegion;
    const countryName = this.i18n(selectedRegion);

    return (
      <div class="gux-selected-option">
        <gux-country-icon
          countryCode={selectedRegion}
          countryName={countryName}
        />
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    const options = [];
    for (const [key, val] of Object.entries(countryCodeMap)) {
      const countryName = this.i18n(key);
      options.push(
        <gux-option value={key}>
          <span>
            <gux-country-icon countryCode={key} countryName={countryName} />
            <span>{`+${val}`}</span>
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
