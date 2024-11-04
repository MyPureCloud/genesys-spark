import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';
import {
  GuxAvatarListItemElement,
  GuxAvatarListItemLayout
} from './gux-avatar-list-item.types';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-avatar-list-item.scss',
  tag: 'gux-avatar-list-item-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarListItem {
  private interactiveRef: HTMLElement;
  private hideTooltipTimeout: ReturnType<typeof setTimeout>;
  private slottedOverflow: HTMLGuxAvatarOverflowBetaElement;

  @Element()
  root: HTMLGuxListItemElement;

  @Prop()
  focusable: boolean = false;

  @Prop()
  interactiveElement: GuxAvatarListItemElement = 'button';

  @Prop()
  layout: GuxAvatarListItemLayout = 'default';

  @State()
  private slottedAvatar: HTMLGuxAvatarBetaElement;

  componentWillLoad() {
    this.validateSlot();
  }

  private validateSlot(): void {
    this.slottedAvatar = this.root.querySelector(
      'gux-avatar-beta'
    ) as HTMLGuxAvatarBetaElement;
    this.slottedOverflow = this.root.querySelector(
      'gux-avatar-overflow-beta'
    ) as HTMLGuxAvatarOverflowBetaElement;
    if (!this.slottedAvatar && !this.slottedOverflow) {
      logWarn(
        this.root,
        'gux-avatar-list-element-beta must contain a gux-avatar-beta or gux-avatar-overflow-beta'
      );
    }
  }

  componentDidLoad() {
    this.validateSlot();
    this.interactiveRef.addEventListener('keyup', (event: KeyboardEvent) => {
      this.handleKeyEvent(event);
    });

    this.interactiveRef.addEventListener('focusout', () => {
      this.handleFocusOut();
    });
  }

  disconnectedCallback(): void {
    this.interactiveRef?.removeEventListener('keyup', (event: KeyboardEvent) =>
      this.handleKeyEvent(event)
    );

    this.interactiveRef?.removeEventListener('focusout', () =>
      this.handleFocusOut()
    );

    clearTimeout(this.hideTooltipTimeout);
  }

  private handleFocusOut(): void {
    if (this.slottedOverflow) {
      return;
    }

    if (this.slottedAvatar) {
      void this.slottedAvatar?.hideTooltip();
      clearTimeout(this.hideTooltipTimeout);
    }
  }

  private handleKeyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab': {
        if (this.slottedOverflow) {
          return;
        }
        if (this.slottedAvatar) {
          this.showAvatarTooltip();
        }
        break;
      }
      case 'ArrowRight':
      case 'ArrowLeft': {
        const parentElement = this.root.parentElement as HTMLElement;
        if (this.slottedOverflow) {
          return;
        }
        if (
          parentElement.classList.contains('gux-avatar-group') &&
          this.slottedAvatar
        ) {
          this.showAvatarTooltip();
        }

        break;
      }
      default: {
        if (
          this.interactiveRef.matches(':focus-visible') &&
          this.slottedAvatar
        ) {
          if (this.slottedOverflow) {
            return;
          }
          void this.slottedAvatar?.hideTooltip();
          clearTimeout(this.hideTooltipTimeout);
        }
        break;
      }
    }
  }

  private showAvatarTooltip(): void {
    if (this.slottedOverflow) {
      return;
    }
    if (this.interactiveRef.matches(':focus-visible') && this.slottedAvatar) {
      void this.slottedAvatar?.showTooltip();
      this.hideTooltipTimeout = setTimeout(() => {
        void this.slottedAvatar?.hideTooltip();
      }, 6000);
    }
  }

  private renderContent(): JSX.Element {
    if (this.layout === 'plus-name') {
      return (
        <span class="gux-avatar-flex">
          <slot></slot>
          <span aria-hidden="true">{this.slottedAvatar?.name}</span>
        </span>
      ) as JSX.Element;
    } else {
      return (<slot></slot>) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host role="listitem">
        {this.interactiveElement === 'a' ? (
          <a
            ref={ref => (this.interactiveRef = ref)}
            href="#"
            class={{ [`gux-avatar-${this.layout}`]: true }}
            tabIndex={this.focusable ? 0 : -1}
          >
            {this.renderContent()}
          </a>
        ) : (
          <button
            ref={ref => (this.interactiveRef = ref)}
            type="button"
            tabIndex={this.focusable ? 0 : -1}
            class={{ [`gux-avatar-${this.layout}`]: true }}
          >
            {this.renderContent()}
          </button>
        )}
      </Host>
    ) as JSX.Element;
  }
}
