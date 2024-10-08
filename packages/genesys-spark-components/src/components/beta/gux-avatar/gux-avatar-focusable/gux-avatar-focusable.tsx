import { Component, h, JSX, Element, State, Host } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';

@Component({
  styleUrl: 'gux-avatar-focusable.scss',
  tag: 'gux-avatar-focusable-beta',
  shadow: true
})
export class GuxAvatarFocusable {
  private slottedElement: HTMLElement;
  private hideTooltipTimeout: ReturnType<typeof setTimeout>;

  @Element() root: HTMLElement;

  @State()
  private avatarElement: HTMLGuxAvatarBetaElement;

  componentWillLoad() {
    this.validateSlot();
  }

  private validateSlot(): void {
    this.slottedElement = this.root.querySelector(
      'a, button, gux-avatar-change-photo-beta'
    );

    if (this.slottedElement) {
      this.avatarElement = this.slottedElement.querySelector('gux-avatar-beta');
      if (!this.avatarElement) {
        logWarn(this.root, 'Slotted element must contain a gux-avatar');
      }
    } else {
      logWarn(
        this.root,
        'An anchor tag, gux-avatar-change-photo-beta tag or button tag must be slotted into gux-avatar-focusable'
      );
    }

    if (['A', 'BUTTON'].includes(this.slottedElement?.tagName)) {
      this.slottedElement.addEventListener('keyup', (event: KeyboardEvent) => {
        this.handleKeyEvent(event);
      });

      this.slottedElement.addEventListener('focusout', () => {
        this.handleFocusOut();
      });
    }
  }

  disconnectedCallback(): void {
    if (['A', 'BUTTON'].includes(this.slottedElement?.tagName)) {
      this.slottedElement?.removeEventListener(
        'keyup',
        (event: KeyboardEvent) => this.handleKeyEvent(event)
      );
      this.slottedElement?.removeEventListener('focusout', () =>
        this.handleFocusOut()
      );
    }
  }

  private handleKeyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (
          this.slottedElement.matches(':focus-visible') &&
          this.avatarElement
        ) {
          void this.avatarElement?.showTooltip();
          this.hideTooltipTimeout = setTimeout(() => {
            void this.avatarElement?.hideTooltip();
          }, 6000);
        }
        break;
      }
      default: {
        if (
          this.slottedElement.matches(':focus-visible') &&
          this.avatarElement
        ) {
          void this.avatarElement?.hideTooltip();
          clearTimeout(this.hideTooltipTimeout);
        }
        break;
      }
    }
  }

  private handleFocusOut(): void {
    void this.avatarElement?.hideTooltip();
    clearTimeout(this.hideTooltipTimeout);
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
