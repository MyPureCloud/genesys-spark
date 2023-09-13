import { Component, Element, JSX, h, State, readTask } from '@stencil/core';

import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { trackComponent } from '@utils/tracking/usage';

import { GuxLoadingMessageSizes } from './gux-loading-message-size.types';
import * as loadingMessageWidth from './gux-loading-message-constants';

/**
 * @slot progress - Required slot for progress.
 * @slot primary-guidance - Required slot for primary guidance.
 * @slot additional-guidance - Slot for additional guidance.
 */

@Component({
  styleUrl: 'gux-loading-message.scss',
  tag: 'gux-loading-message',
  shadow: true
})
export class GuxLoadingMessage {
  /**
   * Reference the host element
   */
  @Element()
  root: HTMLElement;

  @State()
  hasAdditionalGuidance: boolean;

  @State()
  loadingMessageSize: GuxLoadingMessageSizes;

  private resizeObserver?: ResizeObserver;

  private updateLoadingMessageSize() {
    readTask(() => {
      const containerWidth = this.root.clientWidth;

      if (containerWidth <= loadingMessageWidth.SMALL_LOADING_MESSAGE) {
        this.loadingMessageSize = 'small';
      } else if (containerWidth <= loadingMessageWidth.MEDIUM_LOADING_MESSAGE) {
        this.loadingMessageSize = 'medium';
      } else {
        this.loadingMessageSize = 'large';
      }
    });
  }

  componentWillLoad() {
    trackComponent(this.root);
  }

  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateLoadingMessageSize();
      });
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root);
    }

    afterNextRenderTimeout(() => {
      this.updateLoadingMessageSize();
    }, 500);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root);
    }
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-container': true,
          [`gux-${this.loadingMessageSize}`]: true
        }}
        role="alert"
        aria-live="assertive"
      >
        <slot name="progress"></slot>
        <slot name="primary-message"></slot>
        <slot name="additional-guidance"></slot>
      </div>
    ) as JSX.Element;
  }
}
