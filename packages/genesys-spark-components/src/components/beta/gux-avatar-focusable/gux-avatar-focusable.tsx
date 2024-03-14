import { Component, h, JSX, Element, State, Host } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';

@Component({
  tag: 'gux-avatar-focusable-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  @Element() root: HTMLElement;

  @State()
  private avatarElement: HTMLGuxAvatarBetaElement;

  componentWillLoad() {
    this.validateSlot();
  }

  private validateSlot(): void {
    const slottedElement = this.root.querySelector('a, button');
    if (slottedElement) {
      this.avatarElement = slottedElement.querySelector('gux-avatar-beta');
      if (!this.avatarElement) {
        logWarn(this.root, 'Slotted element must contain a gux-avatar');
      }
    } else {
      logWarn(
        this.root,
        'An anchor tag or button tag must be slotted into gux-avatar-focusable'
      );
    }
  }

  render(): JSX.Element {
    return (
      <Host gs-avatar-size={this.avatarElement?.size ?? 'large'}>
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
