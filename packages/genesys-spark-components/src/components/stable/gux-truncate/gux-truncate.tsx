import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';

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

  /**
   * Lines to wrap before truncating
   */
  @Prop()
  tooltipPlacement: Placement = 'bottom-start';

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
    return (
      slotContainerElement?.scrollWidth > slotContainerElement?.offsetWidth ||
      slotContainerElement?.scrollHeight > slotContainerElement?.offsetHeight
    );
  }

  private renderTooltip(): JSX.Element {
    if (this.needsTruncation()) {
      return (
        <gux-tooltip
          placement={this.tooltipPlacement}
          aria-hidden="true"
          ref={el => (this.tooltipElement = el)}
        >
          <div slot="content">{this.getTooltipContent()}</div>
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
          class={{
            'gux-overflow-hidden': this.needsTruncation(),
            'gux-truncate-slot-container': true
          }}
          style={{ webkitLineClamp: this.maxLines?.toString() }}
        >
          <slot />
        </span>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
