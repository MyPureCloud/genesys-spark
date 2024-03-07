import { Component, h, JSX, Element } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';

@Component({
  styleUrl: 'gux-avatar-focusable.scss',
  tag: 'gux-avatar-focusable-beta',
  shadow: true
})
export class GuxAvatarLink {
  @Element() root: HTMLElement;

  componentDidLoad() {
    this.validateSlot();
  }

  private validateSlot(): void {
    const slottedElement = this.root.querySelector('a, button');
    const avatarElement = slottedElement.querySelector('gux-avatar-beta');

    if (!slottedElement) {
      logWarn(
        this.root,
        'An anchor tag or button tag must be slotted into gux-avatar-focusable'
      );
    }

    if (!avatarElement) {
      logWarn(this.root, 'Slotted element must contain a gux-avatar');
    }

    if (['small', 'xsmall'].includes(avatarElement.size)) {
      slottedElement.classList.add('gux-focus-ring-small-focused-visible');
    } else if (
      ['medium', 'large'].includes(avatarElement.size) &&
      [...avatarElement.classList].includes(
        'gux-focus-ring-small-focused-visible'
      )
    ) {
      slottedElement.classList.remove('gux-focus-ring-small-focused-visible');
    }
  }

  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
