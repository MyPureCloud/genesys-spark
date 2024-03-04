import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';

import { trackComponent } from '@utils/tracking/usage';
import { GuxTooltipAccent } from './gux-tooltip-types';
import { findElementById } from '@utils/dom/find-element-by-id';
import { randomHTMLId } from '@utils/dom/random-html-id';

/**
 * @slot content - Slot for content
 */
@Component({
  tag: 'gux-tooltip-beta',
  shadow: true
})
export class GuxTooltip {
  @Element()
  private root: HTMLElement;
  private baseTooltip: HTMLGuxTooltipBaseBetaElement;
  private id: string = randomHTMLId('gux-tooltip');

  @State()
  private forElement: HTMLElement;

  /**
   * Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used)
   */
  @Prop()
  for: string;

  /**
   * Placement of the tooltip. Default is bottom-start
   */
  @Prop({ mutable: true })
  placement: Placement = 'bottom-start';

  @Prop()
  accent: GuxTooltipAccent = 'light';

  /*
   * Show tooltip
   */
  @Method()
  async showTooltip(): Promise<void> {
    return await this.baseTooltip.showTooltip();
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.baseTooltip.hideTooltip();
  }

  @Watch('for')
  private updateForElement(): void {
    this.forElement = this.getForElement();
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.placement });
  }

  connectedCallback(): void {
    this.updateForElement();
  }

  private getForElement(): HTMLElement {
    if (this.for) {
      const forElement = findElementById(this.root, this.for);

      if (!forElement) {
        this.logForAttributeError();
      }

      return forElement;
    } else {
      return this.root.parentElement;
    }
  }

  private logForAttributeError(): void {
    if (this.root.isConnected) {
      console.error(
        `gux-tooltip: invalid element supplied to 'for': "${this.for}"`
      );
    }
  }

  render(): JSX.Element {
    return (
      <Host id={this.id} role="tooltip">
        <gux-tooltip-base-beta
          forElement={this.forElement}
          placement={this.placement}
          accent={this.accent}
          tooltipId={this.id}
          ref={el => (this.baseTooltip = el)}
        >
          <span slot="content">
            <slot name="content">
              <slot />
            </slot>
          </span>
        </gux-tooltip-base-beta>
      </Host>
    ) as JSX.Element;
  }
}
