import { Component, Element, h, JSX, Prop, Method } from '@stencil/core';

import { Placement } from '@floating-ui/dom';

import { trackComponent } from '@utils/tracking/usage';
import { GuxLabelInfoVariant } from './gux-label-info.types';
import { getSlotTextContent } from '../../../utils/dom/get-slot-text-content';

/**
 * @slot content - Required slot for tooltip and screenreader content
 */

@Component({
  styleUrl: 'gux-label-info.scss',
  tag: 'gux-label-info-beta',
  shadow: true
})
export class GuxLabelInfo {
  private tooltipElement: HTMLGuxTooltipBetaElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxLabelInfoVariant = 'info';

  @Prop({ mutable: true })
  placement: Placement = 'right';

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.variant });
  }

  private getVariantIcon(variant: GuxLabelInfoVariant): string {
    return variant === 'question'
      ? 'fa/circle-question-regular'
      : 'fa/circle-info-regular';
  }

  /*
   * Show tooltip
   */
  @Method()
  async showTooltip(): Promise<void> {
    return await this.tooltipElement.showTooltip();
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.tooltipElement.hideTooltip();
  }

  render(): JSX.Element {
    return (
      <div class="gux-label-info">
        <gux-screen-reader-beta>
          <slot name="content"></slot>
        </gux-screen-reader-beta>
        <gux-icon
          icon-name={this.getVariantIcon(this.variant)}
          size="small"
          decorative
        ></gux-icon>
        <gux-tooltip-beta
          placement={this.placement}
          ref={el => (this.tooltipElement = el)}
        >
          <div slot="content">{getSlotTextContent(this.root, 'content')}</div>
        </gux-tooltip-beta>
      </div>
    ) as JSX.Element;
  }
}
