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
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Some list items with gux-avatar-focusable in them
 */
@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarFocusable {
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
    const listElement: HTMLGuxListElement = this.root.querySelector('gux-list');
    listElement.focus();
    afterNextRenderTimeout(() => {
      void listElement?.guxFocusFirstItem();
    });
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
        if (eventIsFrom('gux-list', event)) {
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
            <slot></slot>
          </div>
        </gux-popup>
      </Host>
    ) as JSX.Element;
  }
}
