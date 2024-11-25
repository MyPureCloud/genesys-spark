import { Component, h, JSX, Element, Host, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import {
  setFocusTarget,
  resetFocusableSibling
} from './gux-avatar-group.service';

/**
 * @slot - slot for gux-avatar-group-item components
 */
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

  componentDidLoad(): void {
    this.setInitialFocusTarget();
  }

  private setInitialFocusTarget(): void {
    const groupItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];
    if (groupItems.length > 0) {
      const firstGroupItem = groupItems[0] as Element;
      setFocusTarget(firstGroupItem);
    }
  }

  @Listen('mouseover')
  onMouseOver(event: MouseEvent): void {
    this.hideCurrentTooltip(event);
  }

  private hideCurrentTooltip(event: Event) {
    const target = event.target as HTMLGuxAvatarGroupItemBetaElement;
    const groupItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarGroupItemBetaElement[];

    const focusedChild = groupItems.find(child =>
      child.matches(':focus-within')
    );

    if (focusedChild && focusedChild !== target) {
      focusedChild.hideTooltip();
    }
  }

  private handleClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLGuxAvatarGroupItemBetaElement;
    resetFocusableSibling(clickedElement);
    setFocusTarget(clickedElement);
  }

  render(): JSX.Element {
    return (
      <Host role="menu" onClick={this.handleClick.bind(this)}>
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
