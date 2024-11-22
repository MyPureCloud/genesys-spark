import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Prop,
  Watch,
  State
} from '@stencil/core';

import { getClosestElement } from '@utils/dom/get-closest-element';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot - text
 * @slot subtext - Optional slot for subtext
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
  private hasSubtext: boolean = false;

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
    this.onSubtextChange();
  }

  private onSubtextChange() {
    this.hasSubtext = hasSlot(this.root, 'subtext');
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
          'gux-filtered': this.filtered,
          'gux-selected': this.selected,
          'gux-show-subtext': this.hasSubtext
        }}
        aria-selected={this.getAriaSelected()}
        aria-disabled={this.disabled.toString()}
      >
        <div class="gux-option-wrapper">
          <gux-truncate ref={el => (this.truncateElement = el)}>
            <slot />
          </gux-truncate>
          <slot onSlotchange={() => this.onSubtextChange()} name="subtext" />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
