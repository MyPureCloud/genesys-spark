import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop
} from '@stencil/core';
import { OnMutation } from 'utils/decorator/on-mutation';
import { OnResize } from 'utils/decorator/on-resize';

/**
 * @slot - text node or element containing text to truncate
 */

@Component({
  styleUrl: 'gux-truncate.less',
  tag: 'gux-truncate-beta',
  // Popper tooltip cannot link to shadow dom element
  shadow: false
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

  @Method()
  async setShowTooltip() {
    await this.tooltipElement?.showTooltip();
  }

  @Method()
  async setHideTooltip() {
    await this.tooltipElement?.hideTooltip();
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    forceUpdate(this.root);
  }

  @OnResize()
  onResize(): void {
    forceUpdate(this.root);
  }

  private getTooltipContent(): string {
    return (
      this.root
        .querySelector('.gux-truncate-slot-container')
        ?.textContent.trim() || ''
    );
  }

  private needsTruncation(): boolean {
    const slotContainerElement: HTMLSpanElement = this.root.querySelector(
      '.gux-truncate-slot-container'
    );
    return (
      slotContainerElement?.scrollWidth > slotContainerElement?.offsetWidth ||
      slotContainerElement?.scrollHeight > slotContainerElement?.offsetHeight
    );
  }

  private renderTooltip(): JSX.Element {
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
