import { JSX, Component, h, State, Element, Listen, Host } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from '../gux-rich-text-editor-action/i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRender } from '@utils/dom/after-next-render';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { hasDisabledParent } from '../gux-rich-text-editor.service';

@Component({
  styleUrl: 'gux-rich-text-editor-menu.scss',
  tag: 'gux-rich-text-editor-menu',
  shadow: { delegatesFocus: true }
})
export class GuxRichTextEditorMenu {
  private i18n: GetI18nValue;
  private button: HTMLButtonElement;
  listElement: HTMLGuxRichTextEditorListElement;

  @Element()
  private root: HTMLElement;

  @State()
  private isOpen: boolean = false;

  @OnClickOutside({ triggerEvents: 'click' })
  onClickOutside(): void {
    this.isOpen = false;
  }

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

  private onActionClick(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusFirstListItem();
    }
  }

  private onListClick(event: MouseEvent): void {
    whenEventIsFrom('gux-rich-style-list-item', event, () => {
      this.isOpen = false;
      this.button.focus();
    });
  }

  private renderTooltip(): JSX.Element {
    return (
      <gux-tooltip-beta>
        <div slot="content">{this.i18n('additionalActions')}</div>
      </gux-tooltip-beta>
    ) as JSX.Element;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <Host>
        <gux-popup expanded={this.isOpen} offset={4} exceed-target-width>
          <div slot="target">
            <gux-button-slot accent="ghost">
              <button
                type="button"
                onClick={() => this.onActionClick()}
                ref={el => (this.button = el)}
                aria-haspopup="true"
                aria-expanded={this.isOpen.toString()}
                disabled={hasDisabledParent(this.root)}
              >
                <gux-icon
                  icon-name="fa/ellipsis-vertical-regular"
                  decorative
                  size="small"
                ></gux-icon>
                <gux-screen-reader-beta>
                  {this.i18n('additionalActions')}
                </gux-screen-reader-beta>
              </button>
              {this.renderTooltip()}
            </gux-button-slot>
          </div>
          <div slot="popup" class="gux-list-container">
            <gux-rich-text-editor-list
              onClick={e => this.onListClick(e)}
              ref={el => (this.listElement = el)}
            >
              <slot />
            </gux-rich-text-editor-list>
          </div>
        </gux-popup>
      </Host>
    ) as JSX.Element;
  }
}
