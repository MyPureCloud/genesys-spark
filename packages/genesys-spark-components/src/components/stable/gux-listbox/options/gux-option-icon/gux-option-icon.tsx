import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
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
  styleUrl: 'gux-option-icon.scss',
  tag: 'gux-option-icon',
  shadow: true
})
export class GuxOptionIcon {
  private truncateElement: HTMLGuxTruncateElement;
  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  iconName: string;

  @Prop()
  iconSrText: string;

  @Prop()
  iconColor: string;

  @Prop()
  active: boolean = false;

  @Prop()
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  filtered: boolean = false;

  @Prop({ mutable: true })
  hovered: boolean = false;

  @State()
  private hasSubtext: boolean = false;

  @Listen('mouseenter')
  onmouseenter() {
    this.hovered = true;
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hovered = false;
  }
  @Watch('active')
  handleActive(active: boolean) {
    if (active) {
      void this.truncateElement?.setShowTooltip();
    } else {
      void this.truncateElement?.setHideTooltip();
    }
  }

  componentWillLoad(): void {
    this.root.id = this.root.id || randomHTMLId('gux-option-icon');
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
        <div class="gux-option-text">
          <gux-truncate ref={el => (this.truncateElement = el)}>
            <slot />
          </gux-truncate>
          <span>
            <slot name="subtext"></slot>
          </span>
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
    let iconStyle = null;
    // If the icon color is set and we don't have a background highlight that
    // might cause contrast problems, set the color style.
    if (this.iconColor !== null && !(this.hovered || this.active)) {
      iconStyle = { color: this.iconColor };
    }

    return (
      <Host
        role="option"
        class={{
          'gux-active': this.active,
          'gux-disabled': this.disabled,
          'gux-filtered': this.filtered,
          'gux-hovered': this.hovered,
          'gux-selected': this.selected,
          'gux-show-subtext': this.hasSubtext
        }}
        aria-selected={this.getAriaSelected()}
        aria-disabled={this.disabled.toString()}
      >
        <gux-icon
          decorative={this.iconSrText == null}
          screenreader-text={this.iconSrText}
          icon-name={this.iconName}
          style={iconStyle}
        ></gux-icon>
        {this.renderText()}
      </Host>
    ) as JSX.Element;
  }
}
