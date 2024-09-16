import { Component, h, JSX, Element, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  @Element() root: HTMLElement;

  @Prop() count: number = 0;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <button class="gux-avatar-overflow">
        <div class="gux-avatar-overflow-wrapper">
          <div class="gux-avatar-overflow-content"> +{this.count}</div>
        </div>
      </button>
    ) as JSX.Element;
  }
}
