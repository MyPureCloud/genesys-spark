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

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { trackComponent } from '@utils/tracking/usage';

import {
  GuxButtonMultiAccent,
  getGuxButtonMultiAccent
} from './gux-button-multi.types';

/**
 * @slot title - slot for icon and button text
 */
@Component({
  styleUrl: 'gux-button-multi.scss',
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
   * Disables the action button.
   */
  @Prop()
  disabled: boolean = false;

  @Prop()
  accent: GuxButtonMultiAccent = 'secondary';

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

        if (composedPath.includes(this.listElement)) {
          event.preventDefault();
          this.dropdownButton.focus();
        }

        break;
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.dropdownButton)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstItemInPopupList();
        }
        break;
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ': {
        const composedPath = event.composedPath();

        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          this.focusFirstItemInPopupList();
        }
        break;
      }
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
      if (this.isOpen) {
        this.focusPopupList();
      }
    }
  }

  private focusPopupList(): void {
    afterNextRenderTimeout(() => {
      this.listElement.focus();
    });
  }

  private focusFirstItemInPopupList(): void {
    afterNextRenderTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }

  private onListClick(event: MouseEvent): void {
    whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.dropdownButton.focus();
    });
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <gux-popup
        expanded={this.isOpen}
        exceed-target-width
        placement="bottom-end"
      >
        <div slot="target" class="gux-button-multi-container">
          <gux-button-slot
            class="gux-dropdown-button"
            accent={getGuxButtonMultiAccent(this.accent)}
          >
            <button
              type="button"
              disabled={this.disabled}
              ref={el => (this.dropdownButton = el)}
              onMouseUp={() => this.toggle()}
              aria-haspopup="true"
              aria-expanded={this.isOpen.toString()}
            >
              <slot name="title" />
              <gux-icon decorative icon-name="chevron-small-down"></gux-icon>
            </button>
          </gux-button-slot>
        </div>

        <div class="gux-list-container" slot="popup">
          <gux-list
            onClick={(e: MouseEvent) => this.onListClick(e)}
            ref={el => (this.listElement = el)}
          >
            <slot />
          </gux-list>
        </div>
      </gux-popup>
    ) as JSX.Element;
  }
}
