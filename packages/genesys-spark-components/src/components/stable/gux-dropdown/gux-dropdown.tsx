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

import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { calculateInputDisabledState } from '../../../utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '../../../utils/dom/on-input-disabled-state-change';
import { afterNextRender } from '../../../utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '@utils/decorator/on-mutation';

import translationResources from './i18n/en.json';

import {
  getSearchOption,
  getListOptions
} from '../gux-listbox/gux-listbox.service';
import {
  ListboxOptionElement,
  ValidOptionTag
} from '../gux-listbox/options/option-types';
import { GuxFilterTypes } from './gux-dropdown.types';

/**
 * Our Dropdown component. In the most basic case, it's used with `gux-option` to give users
 * a list of text options to select from, but other types of options with different appearance
 * can be created by creating a new component and adding it to `validOptionTags` list in
 * gux-dropdown-types.ts, then following the resulting compiler errors.
 *
 * @slot - for a gux-listbox containing ValidDropdownOption children
 */
@Component({
  styleUrl: 'gux-dropdown.less',
  tag: 'gux-dropdown',
  shadow: { delegatesFocus: true }
})
export class GuxDropdown {
  private i18n: GetI18nValue;
  private fieldButtonElement: HTMLElement;
  private filterElement: HTMLInputElement;
  private listboxElement: HTMLGuxListboxElement;
  private truncateElement: HTMLGuxTruncateBetaElement;

  @Element()
  private root: HTMLGuxDropdownElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  disabled: boolean = false;

  @Prop()
  required: boolean = false;

  @Prop()
  loading: boolean = false;

  @Prop()
  placeholder: string;

  /**
   * deprecated will be removed in v4 (COMUI-1369). Use filterType instead
   */
  @Prop()
  filterable: boolean = false;

  @Prop()
  filterType: GuxFilterTypes = 'none';

  @Prop()
  hasError: boolean = false;

  @State()
  private expanded: boolean = false;

  @State()
  private filter: string = '';

  @Watch('expanded')
  watchExpanded(expanded: boolean) {
    if (!expanded) {
      this.filter = '';
    }
  }

  @Watch('value')
  watchValue(newValue: string) {
    this.validateValue(newValue, this.listboxElement);
  }

  @Watch('filter')
  handleFilter(filter: string) {
    this.guxfilter.emit(filter);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.isFilterable()) {
          if (document.activeElement === this.listboxElement) {
            return this.filterElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        if (this.shiftTabFromFilterListbox(event)) {
          event.preventDefault();
          return this.filterElement.focus();
        } else if (this.shiftTabFromExpandedFilterInput(event)) {
          event.preventDefault();
          return this.collapseListbox('focusFieldButton');
        } else {
          this.collapseListbox('noFocusChange');
        }
        return;
      case 'ArrowDown':
        if (this.activeElementNotListbox()) {
          event.preventDefault();
          this.expanded = true;
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

  @Event()
  private guxfilter: EventEmitter<string>;

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

        if (this.isFilterable() && this.filterElement) {
          this.filterElement.focus();
        }
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

    onInputDisabledStateChange(this.root, () => {
      forceUpdate(this.root);
    });
  }

  componentDidLoad(): void {
    this.applyListboxEventListeners();
  }

  componentWillRender(): void {
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.listboxElement.loading = this.loading;
      this.listboxElement.filterType = this.filterType;
      this.listboxElement.filter = this.filter;
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

  private isFilterable() {
    return (
      this.filterable ||
      this.filterType === 'starts-with' ||
      this.filterType === 'custom'
    );
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

  private filterInput(event: InputEvent): void {
    event.stopPropagation();
    this.filter = this.filterElement.value;
  }

  private shiftTabFromExpandedFilterInput(event: KeyboardEvent): boolean {
    return (
      event.shiftKey &&
      this.isFilterable() &&
      this.expanded &&
      !(document.activeElement === this.listboxElement)
    );
  }

  private shiftTabFromFilterListbox(event: KeyboardEvent): boolean {
    return (
      event.shiftKey &&
      this.isFilterable() &&
      document.activeElement === this.listboxElement
    );
  }

  private activeElementNotListbox(): boolean {
    return document.activeElement !== this.listboxElement;
  }

  private filterKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.stopImmediatePropagation();
        event.preventDefault();
        this.listboxElement.focus();
        return;
      case 'Enter':
        void this.listboxElement.guxSelectActive();
        event.preventDefault();
        return;
    }
  }

  private filterKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        return;
    }
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

  private getTypeaheadText(filter: string): string {
    const filterLength = filter.length;
    if (filterLength > 0 && !this.loading) {
      const option = getSearchOption(this.listboxElement, filter);
      if (option && this.filterType !== 'custom') {
        //The text content needs to be trimmed as white space can occur around the textContent if options are populated asynchronously.
        return option.textContent.trim().substring(filterLength);
      }
    }

    return '';
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
        return (
          <gux-truncate-beta ref={el => (this.truncateElement = el)}>
            {item.textContent}
          </gux-truncate-beta>
        ) as JSX.Element;
      case 'gux-option-icon':
        return this.renderIconOption(item as HTMLGuxOptionIconElement);
      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustiveCheck: never = tag;
        return _exhaustiveCheck;
    }
  }

  private renderIconOption(iconOption: HTMLGuxOptionIconElement): JSX.Element {
    let iconStyle = null;
    if (iconOption.iconColor !== null) {
      iconStyle = { color: iconOption.iconColor };
    }
    return (
      <span class="gux-selected-icon">
        <gux-icon
          icon-name={iconOption.iconName}
          style={iconStyle}
          decorative
        ></gux-icon>
        <gux-truncate-beta ref={el => (this.truncateElement = el)}>
          {iconOption.textContent}
        </gux-truncate-beta>
      </span>
    ) as JSX.Element;
  }

  private renderFilterInputField(): JSX.Element {
    if (this.expanded && this.isFilterable()) {
      return (
        <div class="gux-field gux-input-field">
          <div class="gux-field-content">
            <div class="gux-filter">
              <div class="gux-filter-display">
                <span class="gux-filter-text">{this.filter}</span>
                <span class="gux-filter-suggestion">
                  {this.getTypeaheadText(this.filter)}
                </span>
              </div>
              <div class="input-and-dropdown-button">
                <input
                  onClick={this.fieldButtonClick.bind(this)}
                  class="gux-filter-input"
                  type="text"
                  aria-label={this.i18n('filterResults')}
                  ref={el => (this.filterElement = el)}
                  onInput={this.filterInput.bind(this)}
                  onKeyDown={this.filterKeydown.bind(this)}
                  onKeyUp={this.filterKeyup.bind(this)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      ) as JSX.Element;
    }
  }

  private renderPopup(): JSX.Element {
    return (
      <div slot="popup" class="gux-listbox-container">
        <slot></slot>
      </div>
    ) as JSX.Element;
  }

  private renderTarget(): JSX.Element {
    return (
      <div
        class={{
          'gux-target-container-expanded': this.expanded && this.isFilterable(),
          'gux-target-container-collapsed': !(
            this.expanded && this.isFilterable()
          ),
          'gux-error': this.hasError
        }}
        slot="target"
      >
        {this.renderFilterInputField()}
        <button
          type="button"
          class="gux-field gux-field-button"
          disabled={calculateInputDisabledState(this.root)}
          onClick={this.fieldButtonClick.bind(this)}
          onFocusin={this.showTooltip.bind(this)}
          onFocusout={this.hideTooltip.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
        >
          {this.renderTargetContent()}
          {this.renderRadialLoading()}
          <gux-icon
            class={{
              'gux-expand-icon': true
            }}
            screenreader-text={this.i18n('dropdown')}
            iconName="chevron-small-down"
          ></gux-icon>
        </button>
      </div>
    ) as JSX.Element;
  }
  private renderTargetContent(): JSX.Element {
    if (!(this.expanded && this.isFilterable())) {
      return (
        <div class="gux-field-content">{this.renderTargetDisplay()}</div>
      ) as JSX.Element;
    }
  }

  private renderRadialLoading(): JSX.Element {
    if (this.loading && !this.expanded) {
      return (
        <gux-radial-loading context="input"></gux-radial-loading>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <gux-popup-beta
        expanded={this.expanded && (!this.loading || this.isFilterable())}
        disabled={this.disabled}
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup-beta>
    ) as JSX.Element;
  }
}
