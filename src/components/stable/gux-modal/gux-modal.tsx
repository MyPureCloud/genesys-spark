import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';

import { GuxModalSize } from './gux-modal.types';

/**
 * @slot content - Required slot for the modal content
 * @slot left-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot right-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot title - Optional slot to set the modal title
 */
@Component({
  styleUrl: 'gux-modal.less',
  tag: 'gux-modal',
  shadow: true
})
export class GuxModal {
  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: GuxModalSize = 'dynamic';

  @Prop()
  trapFocus: boolean = true;

  /**
   * Query selector for the element to initially focus when the modal opens
   * Defaults to the first tabbable element
   */
  @Prop()
  initialFocus?: string | undefined;

  /**
   * Fired when a user dismisses the modal (The default behaviour is to remove the component from the DOM)
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  @Listen('keydown')
  protected handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onDismissHandler(event);
    }
  }

  componentDidLoad() {
    const initialFocusElement = this.getInitialFocusElement();
    const dismissButton =
      this.root.shadowRoot.querySelector('gux-dismiss-button');
    if (initialFocusElement) {
      initialFocusElement.focus();
    } else if (dismissButton) {
      dismissButton.focus();
    }
  }

  @Element()
  private root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();

    return (
      <div class="gux-modal">
        <div class={`gux-modal-container gux-${this.size}`}>
          <gux-dismiss-button
            onClick={this.onDismissHandler.bind(this)}
            onKeyDown={this.onModalTopFocus.bind(this)}
          ></gux-dismiss-button>
          {hasModalTitleSlot && (
            <h1 class="gux-modal-header">
              <slot name="title" />
            </h1>
          )}

          <div
            class={{
              'gux-modal-content': true,
              'gux-no-buttons': !hasFooterButtons
            }}
          >
            <p>
              <slot name="content" />
            </p>
          </div>

          {hasFooterButtons && (
            <div class="gux-button-footer">
              <div class="gux-left-align-buttons">
                <slot name="left-align-buttons" />
              </div>

              <div class="gux-right-align-buttons">
                <slot name="right-align-buttons" />
              </div>
            </div>
          )}
          {/* Putting focus on this element immediately moves focus to the dismiss button at the top of the modal */}
          <span onFocus={this.onModalEndFocus.bind(this)} tabindex="0"></span>
        </div>
      </div>
    ) as JSX.Element;
  }

  private getInitialFocusElement(): HTMLElement | SVGElement | undefined {
    return this.initialFocus
      ? this.root.querySelector<HTMLElement | SVGElement>(this.initialFocus)
      : undefined;
  }

  private hasModalTitleSlot(): boolean {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }

  private hasFooterButtons(): boolean {
    return (
      Boolean(this.root.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="right-align-buttons"]'))
    );
  }

  private onDismissHandler(event: Event): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }

  private onModalTopFocus(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'Tab') {
      const dismissButton =
        this.root.shadowRoot.querySelector('gux-dismiss-button');
      event.preventDefault();
      dismissButton?.focus();
    }
  }

  private onModalEndFocus(): void {
    const dismissButton =
      this.root.shadowRoot.querySelector('gux-dismiss-button');
    dismissButton?.focus();
  }
}
