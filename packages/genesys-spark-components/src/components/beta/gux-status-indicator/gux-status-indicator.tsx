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
  private statusIndicatorContainerElement: HTMLElement;
  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxStatusIndicatorVariant = 'info';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.accent });
  }

  componentDidLoad(): void {
    this.applyTableStyle();
  }

  private applyTableStyle(): void {
    if (this.root.parentElement?.tagName.toLowerCase() === 'td') {
      this.statusIndicatorContainerElement.classList.add(
        'gux-has-table-parent'
      );
    }
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
      <div
        class="gux-status-indicator"
        ref={(el: HTMLElement) => (this.statusIndicatorContainerElement = el)}
      >
        <span class={`gux-status-icon gux-status-icon-${this.accent}`}></span>
        <div class="gux-status-indicator-text">
          <slot />
        </div>
        {this.renderTooltip()}
      </div>
    ) as JSX.Element;
  }
}
