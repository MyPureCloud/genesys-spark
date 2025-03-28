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

import { trackComponent } from '@utils/tracking/usage';
import { GuxTooltipAccent } from '../gux-tooltip-beta/gux-tooltip-types';
import { findElementById } from '@utils/dom/find-element-by-id';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { Placement } from '@floating-ui/dom';

/**
 * @slot content - Slot for content
 */
@Component({
  tag: 'gux-tooltip-pointer-beta',
  shadow: true
})
export class GuxTooltipPointer {
  @Element()
  private root: HTMLElement;
  private baseTooltip: HTMLGuxTooltipBaseBetaElement;
  private id: string = randomHTMLId('gux-tooltip-pointer');
  private tooltipObserver: MutationObserver;

  @State()
  private forElement: HTMLElement;

  @State()
  private role: string;

  /**
   * Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used)
   */
  @Prop()
  for: string;

  @Prop()
  accent: GuxTooltipAccent = 'light';

  @Prop()
  placement: Placement;

  /**
   * Determines whether the text in the tooltip is read by screenreaders.
   * Use for cases where the forElement component handles the accessibility.
   */
  @Prop()
  visualOnly: boolean = false;

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
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    if (this.baseTooltip) {
      this.tooltipObserver = new MutationObserver((): void => {
        this.role = this.baseTooltip?.role;
      });

      this.tooltipObserver.observe(this.baseTooltip, {
        childList: true,
        attributes: true,
        attributeFilter: ['role']
      });
    }
  }

  connectedCallback(): void {
    this.updateForElement();
  }

  disconnectedCallback(): void {
    if (this.tooltipObserver) {
      this.tooltipObserver.disconnect();
    }
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
      <Host id={this.id} role={this.role}>
        <gux-tooltip-base-beta
          forElement={this.forElement}
          placement={this.placement}
          accent={this.accent}
          tooltipId={this.id}
          visualOnly={this.visualOnly}
          ref={el => (this.baseTooltip = el)}
          followMouse={true}
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
