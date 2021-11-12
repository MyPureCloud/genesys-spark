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
  listElement: HTMLGuxListElement;
  dropdownButton: HTMLElement;

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

  private onListElementFocusout(event: FocusEvent): void {
    if (event.relatedTarget !== null && !this.root.matches(':focus-within')) {
      this.isOpen = false;
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
              aria-haspopup="listbox"
              aria-expanded={this.isOpen.toString()}
            >
              <span>{this.text}</span>
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
    );
  }
}
