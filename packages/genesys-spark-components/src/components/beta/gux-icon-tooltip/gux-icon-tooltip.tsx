import { Component, Element, h, JSX, Prop, Method } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { Placement } from '@floating-ui/dom';

import { GuxIconIconName } from '../../stable/gux-icon/gux-icon.types';
import { getSlotTextContent } from '../../../utils/dom/get-slot-text-content';

/**
 * @slot content - Required slot for tooltip and screenreader content
 */

@Component({
  styleUrl: 'gux-icon-tooltip.scss',
  tag: 'gux-icon-tooltip-beta',
  shadow: true
})
export class GuxIconTooltip {
  private tooltip: HTMLGuxTooltipBetaElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  iconName: GuxIconIconName;

  @Prop({ mutable: true })
  placement: Placement = 'right';

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  /*
   * Show tooltip
   */
  @Method()
  async showTooltip(): Promise<void> {
    return await this.tooltip.showTooltip();
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.tooltip.hideTooltip();
  }

  render(): JSX.Element {
    return (
      <div class="gux-icon-tooltip">
        <gux-screen-reader-beta>
          <slot name="content"></slot>
        </gux-screen-reader-beta>
        <gux-icon icon-name={this.iconName} size="small" decorative></gux-icon>
        <gux-tooltip-beta
          placement={this.placement}
          ref={el => (this.tooltip = el)}
        >
          <div slot="content">{getSlotTextContent(this.root, 'content')}</div>
        </gux-tooltip-beta>
      </div>
    ) as JSX.Element;
  }
}
