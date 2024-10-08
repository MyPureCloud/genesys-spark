import { Component, h, JSX, Element, Prop, State } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { randomHTMLId } from '@utils/dom/random-html-id';

/**
 * @slot - Some list items with gux-avatar-focusable in them
 */
@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  private id = randomHTMLId('gux-avatar-overflow');
  @Element() root: HTMLElement;

  @Prop() count: number = 0;

  @State() popoverOpen: boolean = false;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  private togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
    if (this.popoverOpen) {
      this.focusFirstItemInPopupList();
    }
  }

  private focusFirstItemInPopupList(): void {
    const listElement: HTMLGuxListElement = this.root.querySelector('gux-list');
    afterNextRenderTimeout(() => {
      void listElement?.guxFocusFirstItem();
    });
  }

  render(): JSX.Element {
    return [
      <button
        id={this.id}
        class="gux-avatar-overflow"
        onClick={() => this.togglePopover()}
      >
        <div class="gux-avatar-overflow-wrapper">
          <div class="gux-avatar-overflow-content"> +{this.count}</div>
        </div>
      </button>,
      <gux-popover-list
        for={this.id}
        is-open={this.popoverOpen}
        onGuxdismiss={() => (this.popoverOpen = false)}
      >
        <slot></slot>
      </gux-popover-list>
    ] as JSX.Element;
  }
}
