import {
  Component,
  h,
  JSX,
  Element,
  Prop,
  State,
  Listen,
  Method,
  Host
} from '@stencil/core';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - List items
 */
@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarOverflow {
  private overflowButtonElement: HTMLButtonElement;

  @Element() root: HTMLElement;

  @Prop() count: number = 0;

  @State() expanded: boolean = false;

  @Listen('internalcollapsed')
  onInternalCollapsed(event: CustomEvent): void {
    event.stopPropagation();
    this.expanded = false;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  private focusFirstItemInPopupList(): void {
    const listElement: HTMLGuxListElement =
      this.root.shadowRoot.querySelector('gux-list');
    listElement.focus();
    afterNextRenderTimeout(() => {
      void listElement?.guxFocusFirstItem();
    });
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case 'ArrowDown':
        if (target.tagName === 'GUX-AVATAR-OVERFLOW-BETA') {
          this.expanded = true;
          this.focusFirstItemInPopupList();
        }
        break;
      case 'Enter':
        if (target.tagName === 'GUX-AVATAR-OVERFLOW-BETA') {
          void this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom('gux-avatar-list-item-beta', event)) {
          event.stopPropagation();
          this.expanded = false;
          this.overflowButtonElement?.focus();
        }
        break;
      case 'Tab':
        this.expanded = false;
        break;
    }
  }

  /*
   * Focus the overflow button element.
   */
  @Method()
  async guxFocus(): Promise<void> {
    return await this.overflowButtonElement?.focus();
  }

  private toggleOverflowList(): void {
    this.expanded = !this.expanded;
  }

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <gux-popup
          expanded={this.expanded}
          disabled={false}
          exceedTargetWidth={true}
        >
          <div class="gux-target" slot="target">
            <button
              class="gux-avatar-overflow"
              ref={el => (this.overflowButtonElement = el)}
              onClick={() => this.toggleOverflowList()}
              tabIndex={-1}
              aria-haspopup="true"
              aria-expanded={this.expanded.toString()}
            >
              <span class="gux-avatar-overflow-wrapper">
                <span class="gux-avatar-overflow-content"> +{this.count}</span>
              </span>
            </button>
          </div>
          <div slot="popup" class="gux-list-container">
            <gux-list>
              <slot></slot>
            </gux-list>
          </div>
        </gux-popup>
      </Host>
    ) as JSX.Element;
  }
}
