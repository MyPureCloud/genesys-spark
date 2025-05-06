import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Host
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-table-toolbar-menu-button.scss',
  tag: 'gux-table-toolbar-menu-button',
  shadow: { delegatesFocus: true }
})
export class GuxTableToolbarMenuButton {
  listElement: HTMLGuxListElement;
  dropdownButton: HTMLElement;

  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  showMenu: boolean;

  @State()
  expanded: boolean = false;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    const composedPath = event.composedPath();

    switch (event.key) {
      case 'Escape':
        this.expanded = false;

        if (composedPath.includes(this.listElement)) {
          event.preventDefault();
          this.dropdownButton.focus();
        }

        break;
      case 'Tab': {
        this.expanded = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.dropdownButton)) {
          event.preventDefault();
          this.expanded = true;
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
          this.expanded = true;
          this.focusFirstItemInPopupList();
        }
        break;
      }
      case 'Escape': {
        this.dropdownButton.focus();
      }
    }
  }

  private toggle(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusPopupList();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  private focusPopupList(): void {
    afterNextRender(() => {
      this.listElement.focus();
    });
  }

  private focusFirstItemInPopupList(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }

  private renderTooltip(): JSX.Element {
    if (!this.expanded) {
      return (
        <gux-tooltip-beta>
          <div slot="content">{this.i18n('additionalActions')}</div>
        </gux-tooltip-beta>
      ) as JSX.Element;
    }
  }

  get slotItems(): Element[] {
    // Extracting the slot's items to avoid passing nested slots to gux-list, and also to use gux-list-item
    const slot = this.root.querySelector('slot');
    const element = slot.assignedElements()[0] as HTMLElement;
    return Array.from(element.children);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host class={{ 'gux-show-menu': this.showMenu }}>
        <gux-popup expanded={this.expanded} exceed-target-width>
          <div slot="target" class="gux-toolbar-menu-container">
            <gux-button-slot accent="secondary">
              <button
                class="gux-menu-button"
                type="button"
                ref={el => (this.dropdownButton = el)}
                onMouseUp={() => this.toggle()}
                aria-haspopup="true"
                aria-expanded={this.expanded.toString()}
              >
                <gux-icon
                  icon-name="fa/ellipsis-regular"
                  size="small"
                  decorative
                ></gux-icon>
                {this.renderTooltip()}
              </button>
            </gux-button-slot>
          </div>
          <div class="gux-list-container" slot="popup">
            <gux-list
              id="gux-table-toolbar-menu-button-list"
              ref={el => (this.listElement = el)}
            >
              {this.slotItems.map(item => {
                return (
                  <gux-list-item innerHTML={item.outerHTML}></gux-list-item>
                );
              })}
            </gux-list>
          </div>
        </gux-popup>
      </Host>
    ) as JSX.Element;
  }
}
