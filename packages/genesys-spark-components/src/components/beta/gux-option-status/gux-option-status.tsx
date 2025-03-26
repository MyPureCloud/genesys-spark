import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import { GuxStatusIndicatorVariant } from './gux-option-status.types';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { getClosestElement } from '@utils/dom/get-closest-element';

/**
 * @slot default - Slot for the status indicator text.
 */

@Component({
  styleUrl: 'gux-option-status.scss',
  tag: 'gux-option-status-beta',
  shadow: true
})
export class GuxOptionStatus {
  private truncateElement: HTMLGuxTruncateElement;

  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  active: boolean = false;

  @Prop()
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  accent: GuxStatusIndicatorVariant = 'info';

  @Watch('active')
  handleActive(active: boolean) {
    if (active) {
      void this.truncateElement?.setShowTooltip();
    } else {
      void this.truncateElement?.setHideTooltip();
    }
  }

  componentWillLoad(): void {
    this.root.id = this.root.id || randomHTMLId('gux-option-status');
  }

  private getAriaSelected(): boolean | string {
    if (this.disabled) {
      return false;
    }

    return this.selected ? 'true' : 'false';
  }

  private hasDisabledParent(): boolean {
    const parentListbox = getClosestElement(
      'gux-listbox',
      this.root
    ) as HTMLGuxListboxElement;

    return parentListbox?.disabled;
  }

  render(): JSX.Element {
    return (
      <Host
        role="option"
        class={{
          'gux-active': this.active,
          'gux-disabled': this.disabled || this.hasDisabledParent(),
          'gux-selected': this.selected
        }}
        aria-selected={this.getAriaSelected()}
        aria-disabled={this.disabled.toString()}
      >
        <div class="gux-status-indicator">
          <span class={`gux-status-icon gux-status-icon-${this.accent}`}></span>
          <div class="gux-status-indicator-text">
            <gux-truncate ref={el => (this.truncateElement = el)}>
              <slot />
            </gux-truncate>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
