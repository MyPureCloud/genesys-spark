import { Component, Element, JSX, h, State, readTask } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxBlankStateSizes } from './gux-blank-state.types';
import { OnResize } from '../../../utils/decorator/on-resize';
import * as blankStateWidth from './gux-blank-state-constants';

/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 */

@Component({
  styleUrl: 'gux-blank-state.less',
  tag: 'gux-blank-state-beta',
  shadow: true
})
export class GuxBlankState {
  /**
   * Reference the host element
   */
  @Element()
  root: HTMLElement;

  @State()
  blankStateSize: GuxBlankStateSizes;

  @OnResize()
  onResize(): void {
    this.setBlankStateSize();
  }

  componentWillLoad() {
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.setBlankStateSize();
  }

  private setBlankStateSize(): void {
    readTask(() => {
      const containerWidth = this.root.clientWidth;

      if (containerWidth <= blankStateWidth.SMALL_STATE) {
        this.blankStateSize = 'small';
      } else if (containerWidth <= blankStateWidth.MEDIUM_STATE) {
        this.blankStateSize = 'medium';
      } else {
        this.blankStateSize = 'large';
      }
    });
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-container': true,
          [`gux-${this.blankStateSize}`]: true
        }}
      >
        <slot name="image"></slot>
        <div class="gux-message-container">
          <slot name="primary-message"></slot>
        </div>
        <div class="gux-guidance-container">
          <slot name="additional-guidance"></slot>
        </div>
        <gux-button-slot accent="primary">
          <slot name="call-to-action"></slot>
        </gux-button-slot>
      </div>
    ) as JSX.Element;
  }
}
