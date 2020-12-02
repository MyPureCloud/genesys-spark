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

import { ButtonAccents, KeyCode } from '../../../common-enums';

@Component({
  styleUrl: 'gux-action-button.less',
  tag: 'gux-action-button'
})
export class GuxActionButton {
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
  accent: ButtonAccents = ButtonAccents.Secondary;

  /**
   * It is used to open or not the list.
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  @Element()
  root: HTMLElement;

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

  @Watch('isOpen')
  watchValue(newValue: boolean) {
    if (newValue) {
      this.open.emit();
    } else {
      this.close.emit();
    }
  }

  onActionClick() {
    this.actionClick.emit();
  }

  onKeyUpEvent(event: KeyboardEvent) {
    const key = event.keyCode;
    if (key === KeyCode.Esc) {
      this.isOpen = false;
      const e = this.dropdownButton.querySelector('button') as HTMLElement;
      e.focus();
    }
    if (
      key === KeyCode.Down &&
      !((this.listElement as any) as HTMLElement).contains(event.target as Node)
    ) {
      this.isOpen = true;
      this.listElement.setFocusOnFirstItem();
    }
  }

  render() {
    return (
      <div class={'gux-action-button' + (this.isOpen ? ' gux-open' : '')}>
        <gux-button
          accent={this.accent}
          disabled={this.disabled}
          onClick={() => this.onActionClick()}
          class="gux-action"
        >
          <span>{this.text}</span>
        </gux-button>
        <gux-button
          accent={this.accent}
          disabled={this.disabled}
          ref={el => (this.dropdownButton = el)}
          onClick={() => this.toggle()}
          onKeyUp={e => this.onKeyUpEvent(e)}
          class="gux-dropdown"
        >
          <gux-icon decorative iconName="ic-dropdown-arrow"></gux-icon>
        </gux-button>
        <gux-list ref={el => (this.listElement = el as HTMLGuxListElement)}>
          <slot />
        </gux-list>
      </div>
    );
  }
}
