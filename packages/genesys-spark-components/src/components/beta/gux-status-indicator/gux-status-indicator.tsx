import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxStatusIndicatorVariant } from './gux-status-indicator.types';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot default - Slot for the status indicator text.
 * @slot tooltip-text - Slot for the optional tooltip text
 */

@Component({
  styleUrl: 'gux-status-indicator.scss',
  tag: 'gux-status-indicator-beta',
  shadow: true
})
export class GuxStatusIndicator {
  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxStatusIndicatorVariant = 'info';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.accent });
  }

  private renderTooltip(): JSX.Element {
    if (hasSlot(this.root, 'tooltip-text')) {
      return (
        <gux-tooltip>
          <slot name="tooltip-text" />
        </gux-tooltip>
      );
    }
  }

  render(): JSX.Element {
    return (
      <div class="gux-status-indicator">
        <span class={`gux-status-icon gux-status-icon-${this.accent}`}></span>
        <div class="gux-status-indicator-text">
          <slot />
        </div>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
