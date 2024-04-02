import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';

import { OnMutation } from '@utils/decorator/on-mutation';
import { OnResize } from '@utils/decorator/on-resize';
import { getTextContentFromNodes } from '@utils/dom/get-text-content-from-nodes';

/**
 * @slot - text node or element containing text to truncate
 */

@Component({
  styleUrl: 'gux-truncate.scss',
  tag: 'gux-truncate',
  shadow: true
})
export class GuxTruncate {
  private tooltipElement: HTMLGuxTooltipElement;

  @Element()
  private root: HTMLElement;

  /**
   * Lines to wrap before truncating
   */
  @Prop()
  maxLines: number;

  @State()
  needsTruncation2: boolean;

  @Method()
  async setShowTooltip() {
    await this.tooltipElement?.showTooltip();
  }

  @Method()
  async setHideTooltip() {
    await this.tooltipElement?.hideTooltip();
  }

  @OnMutation({ childList: true, subtree: true, characterData: true })
  onMutation(): void {
    forceUpdate(this.root);
  }

  @OnResize()
  onResize(): void {
    forceUpdate(this.root);
  }

  private getTooltipContent(): string {
    return getTextContentFromNodes(Array.from(this.root.childNodes)) || '';
  }

  private needsTruncation(): boolean {
    const slotContainerElement: HTMLSpanElement =
      this.root.shadowRoot.querySelector('.gux-truncate-slot-container');
    console.log(
      'scrollWidth',
      slotContainerElement?.scrollWidth,
      'offsetWidth',
      slotContainerElement?.offsetWidth
    );
    return (
      slotContainerElement?.scrollWidth > slotContainerElement?.offsetWidth ||
      slotContainerElement?.scrollHeight > slotContainerElement?.offsetHeight
    );
  }

  private renderTooltip(): JSX.Element {
    console.log('needs to truncate tooltip', this.needsTruncation());
    if (this.needsTruncation()) {
      return (
        <gux-tooltip aria-hidden="true" ref={el => (this.tooltipElement = el)}>
          {this.getTooltipContent()}
        </gux-tooltip>
      ) as JSX.Element;
    }

    return null;
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-truncate-multi-line': Boolean(this.maxLines)
        }}
      >
        <span
          class="gux-truncate-slot-container"
          style={{ webkitLineClamp: this.maxLines?.toString() }}
        >
          <slot />
        </span>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
