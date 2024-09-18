import { Component, h, JSX, Element, Prop, State } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  @Element() root: HTMLElement;

  @Prop() count: number = 0;

  @State() popoverOpen: boolean = true;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  private togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
  }

  render(): JSX.Element {
    return (
      <button class="gux-avatar-overflow" onClick={() => this.togglePopover()}>
        <div class="gux-avatar-overflow-wrapper">
          <div class="gux-avatar-overflow-content"> +{this.count}</div>
        </div>
      </button>
    ) as JSX.Element;
  }
}
