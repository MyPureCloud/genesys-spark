import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  Watch
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { GuxButtonAccent, GuxButtonType } from '../gux-button/gux-button.types';

import defaultResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-action-button.less',
  tag: 'gux-action-button',
  shadow: true
})
export class GuxActionButton {
  private listElement: HTMLGuxListElement;
  private dropdownButton: HTMLElement;
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  /**
   * The component button type
   */
  @Prop()
  type: GuxButtonType = 'button';

  /**
   * Triggered when the menu is open
   */
  @Event()
  open: EventEmitter;

  /**
   * Triggered when the menu is close
   */
  @Event()
  close: EventEmitter;

  /**
   * Triggered when the action button is clicked
   */
  @Event()
  actionClick: EventEmitter;

  /**
   * The component text.
   */
  @Prop()
  text: string;

  /**
   * Disables the action button.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The component accent (secondary or primary).
   */
  @Prop()
  accent: GuxButtonAccent = 'secondary';

  /**
   * It is used to open or not the list.
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case 'Escape':
        this.isOpen = false;

        if (composedPath.includes(this.listElement)) {
          this.dropdownButton.focus();
        }

        break;
      case 'ArrowDown':
        if (!composedPath.includes(this.listElement)) {
          this.isOpen = true;
          this.listElement.setFocusOnFirstItem();
        }
        break;
    }
  }

  @Watch('disabled')
  watchDisabled(disabled: boolean): void {
    if (disabled) {
      this.isOpen = false;
    }
  }

  @Watch('isOpen')
  watchValue(isOpen: boolean): void {
    if (isOpen) {
      this.open.emit();
    } else {
      this.close.emit();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  private toggle(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  private onActionClick(): void {
    if (!this.disabled) {
      this.isOpen = false;
      this.actionClick.emit();
    }
  }

  private onListElementFocusout(event: FocusEvent): void {
    if (event.relatedTarget !== null && !this.root.matches(':focus-within')) {
      this.isOpen = false;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.type });
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  render(): JSX.Element {
    return (
      <div class="gux-action-button-container">
        <gux-popup-beta expanded={this.isOpen} disabled={this.disabled}>
          <div slot="target" class="gux-action-button-container">
            <gux-button-slot-beta
              class="gux-action-button"
              accent={this.accent}
            >
              <button
                type={this.type}
                disabled={this.disabled}
                onClick={() => this.onActionClick()}
              >
                {this.text}
              </button>
            </gux-button-slot-beta>

            <gux-button-slot-beta
              class="gux-dropdown-button"
              accent={this.accent}
            >
              <button
                type={this.type}
                disabled={this.disabled}
                ref={el => (this.dropdownButton = el)}
                onClick={() => this.toggle()}
                aria-haspopup="listbox"
                aria-expanded={this.isOpen.toString()}
                aria-label={this.i18n('actionButtonDropdown', {
                  buttonTitle: this.text
                })}
              >
                <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
              </button>
            </gux-button-slot-beta>
          </div>

          <gux-list
            slot="popup"
            onFocusout={this.onListElementFocusout.bind(this)}
            ref={el => (this.listElement = el as HTMLGuxListElement)}
          >
            <slot />
          </gux-list>
        </gux-popup-beta>
      </div>
    );
  }
}
