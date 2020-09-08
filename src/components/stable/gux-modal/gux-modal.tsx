import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import modalComponentResources from './i18n/en.json';

export type GuxModalSize = 'small' | 'medium' | 'large';

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
  size: GuxModalSize = 'small';

  /**
   * Fired when a user dismisses the modal
   */
  @Event()
  guxdismiss: EventEmitter<void>;
  private getI18nValue: GetI18nValue;

  @Element()
  private element: HTMLElement;

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.element,
      modalComponentResources
    );
  }

  render(): JSX.Element {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();

    return (
      <div class="modal">
        <div class={`modal-container ${this.size}`}>
          <button
            class="dismiss-button"
            title={this.getI18nValue('dismiss')}
            onClick={this.onDismissClickHandler.bind(this)}
          >
            <gux-icon
              screenreader-text={this.getI18nValue('dismiss')}
              icon-name="ic-close"
            ></gux-icon>
          </button>

          {hasModalTitleSlot && (
            <h1 class="modal-header">
              <slot name="title" />
            </h1>
          )}

          <div
            class={{ 'modal-content': true, 'no-buttons': !hasFooterButtons }}
          >
            <p>
              <slot name="content" />
            </p>
          </div>

          {hasFooterButtons && (
            <div class="button-footer">
              <div class="left-align-buttons">
                <slot name="left-align-buttons" />
              </div>

              <div class="right-align-buttons">
                <slot name="right-align-buttons" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  private hasModalTitleSlot(): boolean {
    return Boolean(this.element.querySelector('[slot="title"]'));
  }

  private hasFooterButtons(): boolean {
    return (
      Boolean(this.element.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.element.querySelector('[slot="right-align-buttons"]'))
    );
  }

  private onDismissClickHandler(event: MouseEvent): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.element.remove();
    }
  }
}
