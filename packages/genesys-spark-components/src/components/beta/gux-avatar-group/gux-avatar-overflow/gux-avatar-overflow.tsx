import { Component, h, JSX, Element, Prop, State, Listen } from '@stencil/core';
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
    console.log(listElement);
    afterNextRenderTimeout(() => {
      void listElement?.guxFocusFirstItem();
    });
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        if (eventIsFrom('.gux-avatar-overflow', event)) {
          this.toggleOverflowList();
          this.focusFirstItemInPopupList();
          console.log('arrowdown');
        }
        break;
      case 'Enter':
        if (eventIsFrom('.gux-avatar-overflow', event)) {
          console.log('enter');
          void this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom('gux-list', event)) {
          console.log('escape from avatar oveflow');
          event.stopPropagation();
          this.expanded = true;
          this.overflowButtonElement?.focus();
        }
        break;
      case 'Tab':
        this.expanded = true;
        break;
    }
  }

  // @Listen('keyup')
  // onKeyup(event: KeyboardEvent): void {
  //   switch (event.key) {
  //     case ' ':
  //       if (eventIsFrom('.gux-avatar-overflow', event)) {
  //         console.log('keyp from avatar oveflow')
  //         this.focusFirstItemInPopupList();
  //       }
  //   }
  // }

  private toggleOverflowList(): void {
    this.expanded = !this.expanded;
    this.focusFirstItemInPopupList();
  }

  render(): JSX.Element {
    return (
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
          >
            <div class="gux-avatar-overflow-wrapper">
              <div class="gux-avatar-overflow-content"> +{this.count}</div>
            </div>
          </button>
        </div>
        <div slot="popup" class="gux-list-container">
          <slot></slot>
        </div>
      </gux-popup>
    ) as JSX.Element;
  }
}
