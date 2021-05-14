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
import { ClickOutside } from 'stencil-click-outside';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { trackComponent } from '../../../usage-tracking';

import translationResources from './i18n/en.json';

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
  private listboxElement: HTMLGuxListboxElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  disabled: boolean = false;

  @Prop()
  placeholder: string;

  @State()
  private expanded: boolean = false;

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

  @Watch('value')
  validateValue(newValue: string) {
    if (newValue === undefined) {
      this.listboxElement.value = newValue;
      return;
    }

    const selectedListboxOptionElement = this.root.querySelector(
      `gux-option-v2[value="${newValue}"]`
    );

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
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        this.collapseListbox('noFocusChange');
        return;
    }
  }

  @Listen('internallistboxoptionsupdated')
  onInternallistboxoptionsupdated(event: CustomEvent): void {
    event.stopPropagation();
    forceUpdate(this.root);
  }

  @ClickOutside({ triggerEvents: 'mousedown' })
  checkForClickOutside() {
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
        <div class="gux-selected-option">{this.renderTargetDisplayText()}</div>
        <gux-icon
          class="gux-expand-icon"
          decorative
          iconName="chevron-small-down"
        ></gux-icon>
      </button>
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

  private updateValue(newValue: string): void {
    if (this.value !== newValue) {
      this.value = newValue;
      this.collapseListbox('focusFieldButton');
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  private renderTargetDisplayText(): JSX.Element {
    const selectedListboxOptionElement = this.root.querySelector(
      `gux-option-v2[value="${this.value}"]`
    );

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
