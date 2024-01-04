import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-option.scss',
  tag: 'gux-option',
  shadow: true
})
export class GuxOption {
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
  filtered: boolean = false;

  @State()
  hasSubtext: boolean = false;

  @Watch('active')
  handleActive(active: boolean) {
    if (active) {
      void this.truncateElement?.setShowTooltip();
    } else {
      void this.truncateElement?.setHideTooltip();
    }
  }

  componentWillLoad(): void {
    this.root.id = this.root.id || randomHTMLId('gux-option');
    this.hasSubtext = hasSlot(this.root, 'subtext');
  }

  private getAriaSelected(): boolean | string {
    if (this.disabled) {
      return false;
    }

    return this.selected ? 'true' : 'false';
  }

  private renderText(): JSX.Element {
    if (this.hasSubtext) {
      return (
        <div class="gux-option-wrapper">
          <gux-truncate ref={el => (this.truncateElement = el)}>
            <slot />
          </gux-truncate>
          <div class="gux-subtext">
            <slot name="subtext"></slot>
          </div>
        </div>
      ) as JSX.Element;
    } else {
      return (
        <gux-truncate ref={el => (this.truncateElement = el)}>
          <slot />
        </gux-truncate>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host
        role="option"
        class={{
          'gux-active': this.active,
          'gux-disabled': this.disabled,
          'gux-filtered': this.filtered,
          'gux-selected': this.selected,
          'gux-show-subtext': this.hasSubtext
        }}
        aria-selected={this.getAriaSelected()}
        aria-disabled={this.disabled.toString()}
      >
        {this.renderText()}
      </Host>
    ) as JSX.Element;
  }
}
