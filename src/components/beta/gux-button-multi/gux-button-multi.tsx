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

import { GuxButtonAccent } from '../../stable/gux-button/gux-button.types';
import { trackComponent } from '../../../usage-tracking';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';

@Component({
  styleUrl: 'gux-button-multi.less',
  tag: 'gux-button-multi',
  shadow: true
})
export class GuxButtonMulti {
  @Element()
  private root: HTMLElement;
  actionListElement: HTMLGuxActionListElement;
  dropdownButton: HTMLElement;
  private moveFocusDelay: number = 100;

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

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case 'Escape':
        this.isOpen = false;

        if (composedPath.includes(this.actionListElement)) {
          this.dropdownButton.focus();
        }

        break;
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'Enter':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.actionListElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.actionListElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
        }
        break;
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case ' ':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.actionListElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
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

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <gux-popup-beta expanded={this.isOpen} disabled={this.disabled}>
        <div slot="target" class="gux-button-multi-container">
          <gux-button-slot-beta
            class="gux-dropdown-button"
            accent={this.accent}
          >
            <button
              type="button"
              disabled={this.disabled}
              ref={el => (this.dropdownButton = el)}
              onClick={() => this.toggle()}
              aria-haspopup="true"
              aria-expanded={this.isOpen.toString()}
            >
              <span>{this.text}</span>
              <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
            </button>
          </gux-button-slot-beta>
        </div>
        <gux-action-list slot="popup" ref={el => (this.actionListElement = el)}>
          <slot />
        </gux-action-list>
      </gux-popup-beta>
    ) as JSX.Element;
  }
}
