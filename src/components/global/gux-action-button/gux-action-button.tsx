import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  Watch
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';
import { IListItem } from '../../../common-interfaces';

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
   * The list.
   * each item should contain a text and a type
   * an item could have the poperty isDisabled
   */
  @Prop()
  items: IListItem[] = [];

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
  accent: string = 'secondary';

  /**
   * It is used to open or not the list.
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  @Element()
  root: HTMLStencilElement;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  @Listen('focusout')
  handleFocusOut(e: FocusEvent) {
    if (!this.root.contains(e.relatedTarget as Node)) {
      this.isOpen = false;
    }
  }

  @Listen('body:click')
  @Listen('body:keydown')
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
    this.toggle();
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
      <div class={'gux-action-button' + (this.isOpen ? ' open' : '')}>
        <gux-button
          accent={this.accent}
          text={this.text}
          disabled={this.disabled}
          onClick={() => this.onActionClick()}
          class="gux-action"
        />
        <gux-button
          accent={this.accent}
          disabled={this.disabled}
          ref={el => (this.dropdownButton = el)}
          onClick={() => this.toggle()}
          onKeyUp={e => this.onKeyUpEvent(e)}
          leftIcon="dropdown-arrow"
          class="gux-dropdown"
        />
        <gux-list
          ref={el => (this.listElement = el as HTMLGuxListElement)}
          items={this.items}
          onKeyUp={e => this.onKeyUpEvent(e)}
          onClick={() => this.toggle()}
        />
      </div>
    );
  }
}
