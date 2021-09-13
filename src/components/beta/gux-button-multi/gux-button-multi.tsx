import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  Watch
} from '@stencil/core';

import { GuxButtonAccent } from '../../stable/gux-button/gux-button.types';
import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-button-multi.less',
  tag: 'gux-button-multi'
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

  toggle() {
    this.isOpen = !this.isOpen;
  }

  @Listen('focusout')
  handleFocusOut(e: FocusEvent) {
    if (!this.root.contains(e.relatedTarget as Node)) {
      this.isOpen = false;
    }
  }

  @Listen('click')
  @Listen('keydown')
  handleKeyDown(e) {
    if (this.root.contains(e.target)) {
      return;
    }
    this.isOpen = false;
  }

  @Watch('disabled')
  watchDisabled(disabled: boolean) {
    if (disabled) {
      this.isOpen = false;
    }
  }

  @Watch('isOpen')
  watchValue(newValue: boolean) {
    if (newValue) {
      this.open.emit();
    } else {
      this.close.emit();
    }
  }

  onKeyUpEvent(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'Escape') {
      this.isOpen = false;
      const button = this.dropdownButton.querySelector('button') as HTMLElement;
      button.focus();
    }

    if (
      key === 'ArrowDown' &&
      !(this.listElement as any as HTMLElement).contains(event.target as Node)
    ) {
      this.isOpen = true;
      this.listElement.setFocusOnFirstItem();
    }
  }

  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }

  render() {
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
              onKeyUp={e => this.onKeyUpEvent(e)}
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
          ref={el => (this.listElement = el as HTMLGuxListElement)}
        >
          <slot />
        </gux-list>
      </gux-popup-beta>
    );
  }
}
