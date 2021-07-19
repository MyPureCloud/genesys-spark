import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
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
  tag: 'gux-modal'
})
export class GuxModal {
  /**
   * Indicates the size of the modal (small, medium or large)
   */
  @Prop()
  size: GuxModalSize = 'dynamic';

  /**
   * Fired when a user dismisses the modal (The default behaviour is to remove the component from the DOM)
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.size });
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();

    return (
      <div class="gux-modal">
        <div class={`gux-modal-container gux-${this.size}`}>
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
          <gux-dismiss-button-beta
            onClick={this.onDismissClickHandler.bind(this)}
          ></gux-dismiss-button-beta>
        </div>
      </div>
    );
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

  private onDismissClickHandler(event: MouseEvent): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
}
