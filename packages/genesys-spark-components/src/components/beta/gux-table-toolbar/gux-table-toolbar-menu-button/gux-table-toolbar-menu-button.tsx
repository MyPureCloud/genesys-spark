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
import { OnClickOutside } from '../../../../utils/decorator/on-click-outside';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { afterNextRender } from '../../../../utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-table-toolbar-menu-button.less',
  tag: 'gux-table-toolbar-menu-button',
  shadow: { delegatesFocus: true }
})
export class GuxTableToolbarMenuButton {
  listElement: HTMLGuxListElement;
  dropdownButton: HTMLElement;
  private tooltipTitleElement: HTMLGuxTooltipTitleElement;

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
    }
  }

  @Listen('focusin')
  onFocusin() {
    void this.tooltipTitleElement.setShowTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    void this.tooltipTitleElement.setHideTooltip();
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

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host class={{ 'gux-show-menu': this.showMenu }}>
        <gux-popup-beta expanded={this.expanded}>
          <div slot="target" class="gux-toolbar-menu-container">
            <gux-button-slot-beta class="gux-menu-button">
              <button
                type="button"
                ref={el => (this.dropdownButton = el)}
                onMouseUp={() => this.toggle()}
                aria-haspopup="true"
                aria-expanded={this.expanded.toString()}
              >
                <gux-tooltip-title ref={el => (this.tooltipTitleElement = el)}>
                  <span>
                    <gux-icon
                      screenreader-text={this.i18n('additionalActions')}
                      icon-name="menu-kebab-horizontal"
                    ></gux-icon>
                  </span>
                </gux-tooltip-title>
              </button>
            </gux-button-slot-beta>
          </div>
          <div class="gux-list-container" slot="popup">
            <gux-list ref={el => (this.listElement = el)}>
              <slot />
            </gux-list>
          </div>
        </gux-popup-beta>
      </Host>
    ) as JSX.Element;
  }
}
