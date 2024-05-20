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

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { trackComponent } from '@utils/tracking/usage';

import translationResources from './i18n/en.json';

import {
  getSearchOption,
  setInitialActiveOption
} from '../gux-listbox/gux-listbox.service';
import { GuxFilterTypes } from '../gux-dropdown/gux-dropdown.types';
import { OnMutation } from '@utils/decorator/on-mutation';
/**
 * @slot - for a gux-listbox-multi containing gux-option-multi children
 */
@Component({
  styleUrl: 'gux-dropdown-multi.scss',
  tag: 'gux-dropdown-multi',
  shadow: { delegatesFocus: true }
})
export class GuxDropdownMulti {
  private i18n: GetI18nValue;
  private fieldButtonElement: HTMLElement;
  private textInputElement: HTMLInputElement;
  private listboxElement: HTMLGuxListboxMultiElement;

  @Element()
  private root: HTMLGuxDropdownMultiElement;

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
   * Override default filtering behavior
   */
  @Prop()
  filterType: GuxFilterTypes = 'none';

  @Prop()
  hasError: boolean = false;

  @State()
  hasCreate: boolean = false;

  @State()
  private expanded: boolean = false;

  @State()
  private textInput: string = '';

  /**
   * This event is emitted to request creating a new option
   */
  @Event()
  guxcreateoption: EventEmitter;

  /**
   * This event will run when the dropdown-multi transitions to an expanded state.
   */
  @Event()
  guxexpanded: EventEmitter<void>;

  /**
   * This event will run when the dropdown-multi transitions to a collapsed state.
   */
  @Event()
  guxcollapsed: EventEmitter<void>;

  @Event()
  private guxfilter: EventEmitter<string>;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    if (this.listboxElement) {
      return;
    }

    this.listboxElement = this.root?.querySelector('gux-listbox-multi');
    this.applyListboxEventListeners();
  }

  /**
   * Listens for expanded event emitted by gux-popup.
   */
  @Listen('internalexpanded')
  onInternalExpanded(event: CustomEvent): void {
    event.stopPropagation();
    this.guxexpanded.emit();
  }

  /**
   * Listens for collapsed event emitted by gux-popup.
   */
  @Listen('internalcollapsed')
  onInternalCollapsed(event: CustomEvent): void {
    event.stopPropagation();
    this.guxcollapsed.emit();
  }

  @Watch('expanded')
  focusSelectedItemAfterRender(expanded: boolean) {
    if (expanded && this.listboxElement) {
      afterNextRender(() => {
        if (this.hasTextInput()) {
          this.textInputElement.focus();
        } else {
          this.listboxElement.focus();
        }
      });
    }

    if (!expanded) {
      this.textInput = '';
    }
  }

  @Watch('value')
  watchValue(newValue: string) {
    this.validateValue(newValue, this.listboxElement);
  }

  @Watch('textInput')
  handleFilter(filter: string) {
    this.guxfilter.emit(filter);
  }

  /**
   * Returns an array of the selected values
   */
  @Method()
  getSelectedValues(): Promise<string[]> {
    return Promise.resolve(this.value?.split(',') || []);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.hasTextInput()) {
          if (document.activeElement === this.listboxElement) {
            return this.textInputElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        if (this.shiftTabFromFilterListbox(event)) {
          event.preventDefault();
          return this.textInputElement.focus();
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
          setInitialActiveOption(this.listboxElement);
        }
        return;
      case 'Enter':
        if (this.canCreateNewOption() && this.isActiveElement()) {
          this.emitCreateOption();
        }
    }
  }

  /**
   * force update when slotted gux-listbox-multi listbox options change
   */
  @Listen('internallistboxoptionsupdated')
  onInternallistboxoptionsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  /**
   * clear selected options when gux-dropdown-multi-tag emits event
   */
  @Listen('internalclearselected')
  onClearselected(event: CustomEvent): void {
    event.stopPropagation();

    this.updateValue('');
    if (this.listboxElement) {
      this.listboxElement.value = undefined;
    }
    this.validateValue(this.value, this.listboxElement);
    this.fieldButtonElement.focus();
  }

  /**
   * emit guxcreateoption event when gux-create-option emits create event
   */
  @Listen('internalcreatenewoption')
  onCreatenewoption(event: CustomEvent): void {
    event.stopPropagation();
    this.emitCreateOption();
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

  connectedCallback(): void {
    this.listboxElement = this.root?.querySelector('gux-listbox-multi');
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.hasCreate = !!this.root.querySelector('gux-create-option');
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
      this.listboxElement.textInput = this.textInput;
    }
  }

  private validateValue(
    newValue: string,
    listboxElement: HTMLGuxListboxMultiElement
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

    this.value = undefined;
  }

  private hasTextInput(): boolean {
    return this.isFilterable() || this.hasCreate;
  }

  private applyListboxEventListeners(): void {
    this.listboxElement?.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();
      this.updateValue((event.target as HTMLGuxListboxMultiElement).value);
    });
    this.listboxElement?.addEventListener('change', (event: InputEvent) => {
      event.stopPropagation();
    });
  }

  private isFilterable(): boolean {
    return this.filterType === 'custom' || this.filterType === 'starts-with';
  }

  private stopPropagationOfInternalFocusEvents(event: FocusEvent): void {
    if (this.root.contains(event.relatedTarget as Node)) {
      return event.stopImmediatePropagation();
    }
  }

  private getOptionElementByValue(value: string): HTMLGuxOptionElement[] {
    const listboxOptionElements = Array.from(
      this.root.querySelectorAll('gux-option-multi')
    );
    const values = value ? value.split(',') : undefined;
    if (values) {
      return listboxOptionElements.filter(element =>
        values.includes(element.value)
      );
    }
    return;
  }

  private fieldButtonClick(): void {
    this.expanded = !this.expanded;
  }

  private fieldButtonInputClick(): void {
    if (!this.expanded) {
      this.expanded = !this.expanded;
    }
  }

  private filterInput(event: InputEvent): void {
    event.stopPropagation();
    this.textInput = this.textInputElement.value;
  }

  private shiftTabFromExpandedFilterInput(event: KeyboardEvent): boolean {
    return (
      event.shiftKey &&
      this.hasTextInput() &&
      this.expanded &&
      !(document.activeElement === this.listboxElement)
    );
  }

  private shiftTabFromFilterListbox(event: KeyboardEvent): boolean {
    return (
      event.shiftKey &&
      this.hasTextInput() &&
      document.activeElement === this.listboxElement
    );
  }

  private emitCreateOption(): void {
    this.guxcreateoption.emit(this.textInput);
    this.textInput = '';
    this.textInputElement.value = '';
  }

  /**
   * check if able to create new option from text input value
   */
  private canCreateNewOption(): boolean {
    return (
      this.hasCreate && this.textInput && !this.listboxElement.hasExactMatch
    );
  }

  private isActiveElement(): boolean {
    return document.activeElement === this.root;
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
        setInitialActiveOption(this.listboxElement);
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
  }

  private getTypeaheadText(textInput: string): string {
    const textInputLength = textInput.length;
    if (textInputLength > 0 && !this.loading) {
      const option = getSearchOption(this.listboxElement, textInput);
      if (option && this.filterType !== 'custom') {
        const optionSlotTextContent = option.querySelector(
          '[gux-slot-container]'
        )?.textContent;
        return optionSlotTextContent?.substring(textInputLength);
      }

      return '';
    }
  }

  private renderTargetDisplay(): JSX.Element {
    return (
      <div class="gux-placeholder">
        {this.placeholder || this.i18n('noSelection')}
        {this.getSrSelectedText()}
      </div>
    ) as JSX.Element;
  }

  private getSrSelectedText(): JSX.Element {
    const selectedListboxOptionElement = this.getOptionElementByValue(
      this.value
    );
    if (selectedListboxOptionElement?.length) {
      return (
        <span class="gux-sr-only">
          {this.i18n('numberSelected', {
            numberSelected: selectedListboxOptionElement.length.toString()
          })}
        </span>
      ) as JSX.Element;
    }
  }

  private getInputAriaLabel(): string {
    return this.canCreateNewOption() && this.isActiveElement()
      ? this.i18n('pressEnterToCreate', { textInputValue: this.textInput })
      : this.i18n('textInputResults');
  }

  private renderTag(): JSX.Element {
    const selectedValues = this.value?.split(',') || [];
    if (selectedValues.length) {
      return (
        <gux-dropdown-multi-tag
          disabled={this.disabled}
          number-selected={selectedValues.length}
        ></gux-dropdown-multi-tag>
      ) as JSX.Element;
    }
  }

  private renderFilterInputField(): JSX.Element {
    if (this.expanded && this.hasTextInput()) {
      return (
        <div class="gux-field gux-input-field">
          <div class="gux-field-content">
            <div class="gux-filter">
              <div class="gux-filter-display">
                <span class="gux-filter-text">{this.textInput}</span>
                <span class="gux-filter-suggestion">
                  {this.getTypeaheadText(this.textInput)}
                </span>
              </div>
              <div class="input-and-dropdown-button">
                <input
                  onClick={this.fieldButtonInputClick.bind(this)}
                  placeholder={this.placeholder || this.i18n('noSelection')}
                  class="gux-filter-input"
                  type="text"
                  aria-label={this.getInputAriaLabel()}
                  ref={el => (this.textInputElement = el)}
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
        <slot />
      </div>
    ) as JSX.Element;
  }

  private renderTarget(): JSX.Element {
    return (
      <div
        class={{
          'gux-target-container': true,
          'gux-target-container-expanded': this.expanded && this.hasTextInput(),
          'gux-target-container-collapsed': !(
            this.expanded && this.hasTextInput()
          ),
          'gux-error': this.hasError,
          'gux-disabled': this.disabled
        }}
        slot="target"
      >
        {this.renderFilterInputField()}
        <button
          type="button"
          class="gux-field gux-field-button"
          disabled={this.disabled}
          onClick={this.fieldButtonClick.bind(this)}
          ref={el => (this.fieldButtonElement = el)}
          aria-haspopup="listbox"
          aria-expanded={this.expanded.toString()}
        >
          {this.renderTargetContent()}
          {this.renderTag()}
          {this.renderRadialLoading()}
          <gux-icon
            class={{
              'gux-expand-icon': true
            }}
            screenreader-text={this.i18n('dropdown')}
            iconName="custom/chevron-down-small-regular"
          ></gux-icon>
        </button>
      </div>
    ) as JSX.Element;
  }
  private renderTargetContent(): JSX.Element {
    if (!(this.expanded && this.hasTextInput())) {
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
    return [
      <div class="gux-dropdown-container">
        <gux-popup
          expanded={this.expanded && (!this.loading || this.isFilterable())}
          disabled={this.disabled}
        >
          {this.renderTarget()}
          {this.renderPopup()}
        </gux-popup>
      </div>
    ] as JSX.Element;
  }
}
