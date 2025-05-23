import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Listen,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '@utils/decorator/on-mutation';

import translationResources from './i18n/en.json';

import {
  getListOptions,
  setInitialActiveOption
} from '../../stable/gux-listbox/gux-listbox.service';
import {
  ListboxOptionElement,
  ValidOptionTag
} from '../../stable/gux-listbox/options/option-types';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * Our Dropdown component. In the most basic case, it's used with `gux-option` to give users
 * a list of text options to select from, but other types of options with different appearance
 * can be created by creating a new component and adding it to `validOptionTags` list in
 * gux-dropdown-types.ts, then following the resulting compiler errors.
 *
 * @slot - for a gux-listbox containing ValidDropdownOption children
 */
@Component({
  styleUrl: 'gux-inline-dropdown.scss',
  tag: 'gux-inline-dropdown-beta',
  shadow: { delegatesFocus: true }
})
export class GuxDropdown {
  private i18n: GetI18nValue;
  private fieldButtonElement: HTMLElement;
  private listboxElement: HTMLGuxListboxElement;
  private popupElement: HTMLGuxPopupElement;
  private truncateElement: HTMLGuxTruncateElement;

  @Element()
  private root: HTMLGuxDropdownElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  required: boolean = false;

  @Prop()
  placeholder: string;

  @State()
  private expanded: boolean = false;

  @Watch('value')
  watchValue(newValue: string) {
    this.validateValue(newValue, this.listboxElement);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        this.collapseListbox('noFocusChange');

        return;
      case 'ArrowDown':
        if (this.activeElementNotListbox()) {
          event.preventDefault();
          this.expanded = true;
          setInitialActiveOption(this.listboxElement);
        }
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
  }

  @Listen('focusin')
  onFocusin(event: FocusEvent): void {
    this.stopPropagationOfInternalFocusEvents(event);
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }

  @Event()
  guxexpanded: EventEmitter<void>;

  @Event()
  guxcollapsed: EventEmitter<void>;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    if (this.listboxElement) {
      return;
    }

    this.listboxElement = this.root?.querySelector('gux-listbox');
    this.applyListboxEventListeners();
  }

  @Listen('internalexpanded')
  onInternalExpanded(event: CustomEvent): void {
    event.stopPropagation();
    this.guxexpanded.emit();

    if (this.listboxElement) {
      afterNextRender(() => {
        this.listboxElement.focus();
      });
    }
  }

  @Listen('internalcollapsed')
  onInternalCollapsed(event: CustomEvent): void {
    event.stopPropagation();
    this.guxcollapsed.emit();
  }

  connectedCallback(): void {
    this.listboxElement = this.root?.querySelector('gux-listbox');
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  componentDidLoad(): void {
    this.applyListboxEventListeners();
    this.applyTableStyle();
  }

  componentWillRender(): void {
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
    }
  }
  private showTooltip(): void {
    void this.truncateElement?.setShowTooltip();
  }

  private hideTooltip(): void {
    void this.truncateElement?.setHideTooltip();
  }

  private validateValue(
    newValue: string,
    listboxElement: HTMLGuxListboxElement
  ): void {
    if (newValue === undefined) {
      if (listboxElement) {
        listboxElement.value = newValue;
      }
      return;
    }

    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);

    if (selectedListboxOptionElement) {
      listboxElement.value = newValue;
      return;
    }
  }

  private applyTableStyle(): void {
    if (this.root.parentElement?.tagName.toLowerCase() === 'td') {
      this.popupElement.classList.add('gux-has-table-parent');
    }
  }

  private applyListboxEventListeners(): void {
    this.listboxElement?.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();

      this.updateValue((event.target as HTMLGuxListboxElement).value);
    });
    this.listboxElement?.addEventListener('change', (event: InputEvent) => {
      event.stopPropagation();
    });
  }

  private stopPropagationOfInternalFocusEvents(event: FocusEvent): void {
    if (this.root.contains(event.relatedTarget as Node)) {
      return event.stopImmediatePropagation();
    }
  }

  get optionElements(): Array<ListboxOptionElement> {
    return getListOptions(this.listboxElement);
  }

  private getOptionElementByValue(value: string): HTMLElement {
    return this.optionElements.find(optionElement => {
      return optionElement.value === value;
    });
  }

  private fieldButtonClick(): void {
    this.expanded = !this.expanded;
  }

  private activeElementNotListbox(): boolean {
    return document.activeElement !== this.listboxElement;
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

  private updateValue(newValue: string): void {
    if (this.value !== newValue) {
      this.value = newValue;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
    this.collapseListbox('focusFieldButton');
  }

  private renderTargetDisplay(): JSX.Element {
    const selectedListboxOptionElement = this.getOptionElementByValue(
      this.value
    );
    if (selectedListboxOptionElement) {
      return (
        <div class="gux-selected-option">
          {this.renderSelectedItem(selectedListboxOptionElement)}
        </div>
      ) as JSX.Element;
    }

    return (
      <div class="gux-placeholder">
        {this.placeholder || this.i18n('noSelection')}
      </div>
    ) as JSX.Element;
  }

  /**
   * Renders the selection display for the selected item. This function needs a branch to handle
   * each type defined in GuxDropdownOptionType
   *
   * @param item The selected item. This can be any of the node types defined in GuxDropdownOptionType.
   * @returns Rendered selection details.
   */
  private renderSelectedItem(item: HTMLElement): JSX.Element {
    const tag = item.tagName.toLowerCase() as ValidOptionTag;
    switch (tag) {
      case 'gux-option':
        return this.renderOption(item as HTMLGuxOptionElement);
      case 'gux-option-icon':
        return this.renderIconOption(item as HTMLGuxOptionIconElement);
      case 'gux-option-status-beta':
        return this.renderStatusOption(item as HTMLGuxOptionStatusBetaElement);
      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustiveCheck: never = tag;
        return _exhaustiveCheck;
    }
  }

  private renderOption(option: HTMLGuxOptionElement): JSX.Element {
    let optionText = option.textContent;
    if (hasSlot(option, 'subtext')) {
      const subtext = option.querySelector('[slot=subtext]');
      optionText = optionText.substring(
        0,
        optionText.length - subtext.textContent.length
      );
    }
    return (
      <gux-truncate ref={el => (this.truncateElement = el)} dir="auto">
        {optionText}
      </gux-truncate>
    ) as JSX.Element;
  }

  private renderIconOption(iconOption: HTMLGuxOptionIconElement): JSX.Element {
    let iconStyle = null;
    if (iconOption.iconColor !== null) {
      iconStyle = { color: iconOption.iconColor };
    }
    return (
      <span
        class={{
          'gux-selected-icon': true,
          'gux-icon-position-end': iconOption.iconPosition === 'end'
        }}
      >
        <gux-icon
          icon-name={iconOption.iconName}
          style={iconStyle}
          decorative
          size="small"
        ></gux-icon>
        <gux-truncate ref={el => (this.truncateElement = el)}>
          {iconOption.textContent}
        </gux-truncate>
      </span>
    ) as JSX.Element;
  }

  private renderStatusOption(
    statusOption: HTMLGuxOptionStatusBetaElement
  ): JSX.Element {
    const optionText = statusOption.textContent;
    return (
      <div class="gux-status-indicator">
        <span
          class={`gux-status-icon gux-status-icon-${statusOption.accent}`}
        ></span>
        <div class="gux-status-indicator-text">{optionText}</div>
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    return (<slot slot="popup"></slot>) as JSX.Element;
  }

  private renderTarget(): JSX.Element {
    return (
      <div
        class={{
          'gux-target-container-collapsed': true
        }}
        slot="target"
      >
        <button
          type="button"
          class="gux-field gux-field-button"
          onClick={this.fieldButtonClick.bind(this)}
          onFocusin={this.showTooltip.bind(this)}
          onFocusout={this.hideTooltip.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
        >
          {this.renderTargetContent()}
          <gux-icon
            class={{
              'gux-expand-icon': true
            }}
            screenreader-text={this.i18n('dropdown')}
            size="small"
            iconName={
              this.expanded
                ? 'custom/chevron-up-small-regular'
                : 'custom/chevron-down-small-regular'
            }
          ></gux-icon>
        </button>
      </div>
    ) as JSX.Element;
  }
  private renderTargetContent(): JSX.Element {
    return (
      <div class="gux-field-content">{this.renderTargetDisplay()}</div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup
        expanded={this.expanded}
        inline={true}
        ref={(el: HTMLGuxPopupElement) => (this.popupElement = el)}
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
