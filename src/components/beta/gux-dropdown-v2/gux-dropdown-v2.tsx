import {
  Component,
  Element,
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
import { trackComponent } from '../../../usage-tracking';

import translationResources from './i18n/en.json';

import { getSearchOption } from './gux-listbox/gux-listbox.service';

/**
 * @slot - for gux-list-box
 */
@Component({
  styleUrl: 'gux-dropdown-v2.less',
  tag: 'gux-dropdown-v2-beta',
  shadow: true
})
export class GuxDropdownV2Beta {
  private i18n: GetI18nValue;
  private fieldButtonElement: HTMLElement;
  private filterElement: HTMLInputElement;
  private listboxElement: HTMLGuxListboxElement;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  disabled: boolean = false;

  @Prop()
  placeholder: string;

  @Prop()
  filterable: boolean = false;

  @State()
  private expanded: boolean = false;

  @State()
  private filter: string = '';

  @Watch('expanded')
  focusSelectedItemAfterRender(expanded: boolean) {
    if (expanded && this.listboxElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.listboxElement.focus();

          if (this.filterable) {
            this.filterElement.focus();
          }
        });
      });
    }

    if (!expanded) {
      this.filter = '';
    }
  }

  @Watch('value')
  validateValue(newValue: string) {
    if (newValue === undefined) {
      this.listboxElement.value = newValue;
      return;
    }

    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);

    if (selectedListboxOptionElement) {
      this.listboxElement.value = newValue;
      return;
    }

    this.value = undefined;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.filterable) {
          if (document.activeElement === this.listboxElement) {
            return this.filterElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        this.collapseListbox('noFocusChange');
        return;
      case 'ArrowUp':
        if (this.filterable) {
          if (document.activeElement === this.listboxElement) {
            return this.filterElement.focus();
          }
        }
        return;
    }
  }

  @Listen('internallistboxoptionsupdated')
  onInternallistboxoptionsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    this.listboxElement = this.root.querySelector('gux-listbox');
    this.validateValue(this.value);
  }

  componentDidLoad(): void {
    this.listboxElement.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation();

      this.updateValue((event.target as HTMLGuxListElement).value);
    });
    this.listboxElement.addEventListener('change', (event: InputEvent) => {
      event.stopPropagation();
    });
  }

  componentWillRender(): void {
    this.validateValue(this.value);
    this.listboxElement.filter = this.filter;
  }

  private getOptionElementByValue(value: string): HTMLGuxOptionV2Element {
    const listboxOptionElements = this.root.querySelectorAll('gux-option-v2');

    return Array.from(listboxOptionElements).find(
      listboxOptionElement => listboxOptionElement.value === value
    );
  }

  private fieldButtonClick(): void {
    this.expanded = !this.expanded;
  }

  private filterInput(): void {
    this.filter = this.filterElement.value;
  }

  private filterKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.stopImmediatePropagation();
        this.listboxElement.focus();
        return;
      case 'Enter':
        this.listboxElement.guxSelectActive();
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
      this.collapseListbox('focusFieldButton');
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  private getSuggestionText(filter: string): string {
    const filterLength = filter.length;
    if (filterLength > 0) {
      const option = getSearchOption(this.listboxElement, filter);

      if (option) {
        return option.textContent.substring(filterLength);
      }
    }

    return '';
  }

  private renderTargetDisplay(): JSX.Element {
    const selectedListboxOptionElement = this.getOptionElementByValue(
      this.value
    );

    if (this.expanded && this.filterable) {
      return (
        <div class="gux-filter">
          <div class="gux-filter-display">
            <span class="gux-filter-text">{this.filter}</span>
            <span class="gux-filter-suggestion">
              {this.getSuggestionText(this.filter)}
            </span>
          </div>
          <input
            class="gux-filter-input"
            type="text"
            ref={el => (this.filterElement = el)}
            onInput={this.filterInput.bind(this)}
            onKeyDown={this.filterKeydown.bind(this)}
            onKeyUp={this.filterKeyup.bind(this)}
          ></input>
        </div>
      );
    }

    if (selectedListboxOptionElement) {
      return (
        <div class="gux-selected-option">
          {selectedListboxOptionElement.textContent}
        </div>
      );
    }

    return (
      <div class="gux-placeholder">
        {this.placeholder || this.i18n('noSelection')}
      </div>
    );
  }

  private renderTarget(): JSX.Element {
    return (
      <button
        slot="target"
        type="button"
        class="gux-field-button"
        disabled={this.disabled}
        onClick={this.fieldButtonClick.bind(this)}
        ref={el => (this.fieldButtonElement = el)}
        aria-haspopup="listbox"
        aria-expanded={this.expanded.toString()}
      >
        <div class="gux-field-button-content">{this.renderTargetDisplay()}</div>
        <gux-icon
          class="gux-expand-icon"
          decorative
          iconName="chevron-small-down"
        ></gux-icon>
      </button>
    );
  }

  private renderPopup(): JSX.Element {
    return (
      <div slot="popup" class="gux-listbox-container">
        <slot></slot>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <gux-popup-beta expanded={this.expanded} disabled={this.disabled}>
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup-beta>
    );
  }
}
