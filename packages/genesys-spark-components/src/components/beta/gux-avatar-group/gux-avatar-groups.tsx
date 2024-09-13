import { Component, h, JSX, Element, State, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Some gux-avatars
 */

@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: true
})
export class GuxAvatarGroup {
  @Element()
  root: HTMLElement;

  @State()
  avatarList: HTMLGuxAvatarBetaElement[];

  @Listen('click')
  onClick(e: MouseEvent): void {
    e.stopPropagation();
    const targetButton = (e.target as HTMLElement).parentElement;
    console.log(targetButton);
    targetButton.focus();
  }

  async componentWillLoad(): Promise<void> {
    this.avatarList = Array.from(
      this.root.children
    ) as HTMLGuxAvatarBetaElement[];
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-avatar-group">
        <slot></slot>
      </div>
    ) as JSX.Element;
  }
}
