import { Component, h, JSX, Element, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';

@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarGroup {
  @Element()
  root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    if (this.root.querySelectorAll('gux-avatar-group-item-beta').length === 0) {
      logWarn(
        this.root,
        'gux-avatar-group-beta: No gux-avatar-group-item-beta tags found in slot. Please add gux-avatar-group-item-beta tags to the slot.'
      );
    }
  }

  render(): JSX.Element {
    return (
      <Host role="menu">
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
