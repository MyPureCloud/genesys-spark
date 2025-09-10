import {
  JSX,
  Component,
  h,
  State,
  Element,
  Prop,
  Listen,
  Host
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRender } from '@utils/dom/after-next-render';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';

@Component({
  styleUrl: 'gux-context-menu.scss',
  tag: 'gux-context-menu',
  shadow: { delegatesFocus: true }
})
export class GuxContextMenu {
  private i18n: GetI18nValue;
  private button: HTMLButtonElement;
  listElement: HTMLGuxListElement;
  private buttonId: string = randomHTMLId();

  @Element()
  private root: HTMLElement;

  /**
   * Indicates button density style. Intended to be paired with gux-table property.
   */
  @Prop()
  compact: boolean = false;

  /**
   * Controls the disabled state of the internal button
   */
  @Prop()
  disabled: boolean = false;

  /**
   * Screenreader text for context menu button
   * defaults to "context menu"
   */
  @Prop()
  screenreaderText: string = '';

  /**
   * Placement of the popup
   * defaults to is "bottom-start"
   */
  @Prop()
  placement: Placement = 'bottom-start';

  /**
   * Controls the visibility of the popover list
   */
  @State()
  private isOpen: boolean = false;

  /**
   * Updates the state on click outside the element
   */
  @OnClickOutside({ triggerEvents: 'click' })
  onClickOutside(): void {
    this.isOpen = false;
  }

  // Note(E.Yankova): keydown handler
  // reference: https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-actions-active-descendant
  // section: "Keyboard Support" and "Menu"
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    const isListEvent = event.composedPath().includes(this.listElement);
    const isButtonEvent = event.composedPath().includes(this.button);

    switch (event.key) {
      case 'Escape': {
        if (isListEvent) {
          event.preventDefault();
          this.isOpen = false;
          this.button.focus();
        }
        break;
      }
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter': {
        if (isButtonEvent && !this.isOpen) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstListItem();
        }
        break;
      }
      case 'ArrowUp': {
        if (isButtonEvent && !this.isOpen) {
          event.preventDefault();
          this.isOpen = true;
          this.focusLastListItem();
        }
        break;
      }
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ': {
        if (event.composedPath().includes(this.button)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstListItem();
        }
        break;
      }
    }
  }

  private focusFirstListItem(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }

  private focusLastListItem(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusLastItem();
    });
  }

  private onButtonClick(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusFirstListItem();
    }
  }

  private onListClick(event: MouseEvent): void {
    whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.button.focus();
    });
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <Host>
        <gux-popup
          placement={this.placement}
          expanded={this.isOpen}
          offset={4} // --gse-ui-contextMenu-gap TODO: Should use the json token as part of COMUI-2480
          exceed-target-width
        >
          <div slot="target" class="gux-button-container">
            <gux-button-slot accent="ghost">
              <button
                type="button"
                onClick={() => this.onButtonClick()}
                id={this.buttonId}
                class={{ 'gux-compact': this.compact }}
                ref={el => (this.button = el)}
                aria-haspopup="true"
                aria-expanded={this.isOpen.toString()}
                disabled={this.disabled}
              >
                <gux-screen-reader-beta>
                  {this.screenreaderText ||
                    this.i18n('contextMenuScreenreaderText')}
                </gux-screen-reader-beta>
                <gux-icon
                  icon-name="fa/ellipsis-vertical-regular"
                  size="small"
                  decorative
                ></gux-icon>
              </button>
            </gux-button-slot>
          </div>
          <div slot="popup" class="gux-list-container">
            <gux-list
              onClick={e => this.onListClick(e)}
              ref={el => (this.listElement = el)}
            >
              <slot />
            </gux-list>
          </div>
        </gux-popup>
      </Host>
    ) as JSX.Element;
  }
}
