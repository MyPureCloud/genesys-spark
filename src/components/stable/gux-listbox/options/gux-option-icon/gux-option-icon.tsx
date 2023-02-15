import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';

import { randomHTMLId } from '../../../../../utils/dom/random-html-id';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-option-icon.less',
  tag: 'gux-option-icon',
  shadow: false
})
export class GuxOptionIcon {
  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  iconName: string;

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

  @Listen('mouseenter')
  onmouseenter() {
    this.hovered = true;
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hovered = false;
  }

  componentWillLoad(): void {
    this.root.id = this.root.id || randomHTMLId('gux-option-icon');
  }

  private getAriaSelected(): boolean | string {
    if (this.disabled) {
      return false;
    }

    return this.selected ? 'true' : 'false';
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
          'gux-selected': this.selected
        }}
        aria-selected={this.getAriaSelected()}
        aria-disabled={this.disabled.toString()}
      >
        <gux-icon
          decorative
          icon-name={this.iconName}
          style={iconStyle}
        ></gux-icon>
        <slot />
      </Host>
    ) as JSX.Element;
  }
}
