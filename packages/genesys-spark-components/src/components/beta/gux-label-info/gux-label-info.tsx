import { Component, Element, h, JSX, Prop, Method } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { GuxLabelInfoVariant } from './gux-label-info.types';

/**
 * @slot content
 */

@Component({
  tag: 'gux-label-info-beta',
  shadow: false // shadow is false to allow gux-icon-tooltip-beta to access text for tooltip
})
export class GuxLabelInfo {
  private iconTooltip: HTMLGuxIconTooltipBetaElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxLabelInfoVariant = 'info';

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
    return await this.iconTooltip.showTooltip();
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.iconTooltip.hideTooltip();
  }

  render(): JSX.Element {
    return (
      <gux-icon-tooltip-beta
        icon-name={this.getVariantIcon(this.variant)}
        ref={el => (this.iconTooltip = el)}
      >
        <div slot="content">
          <slot name="content" />
        </div>
      </gux-icon-tooltip-beta>
    ) as JSX.Element;
  }
}
